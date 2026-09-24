/**
 * POST /api/chat — CM Assistant backend (Vercel serverless).
 * Env vars: AI_API_KEY (required, OpenAI-compatible),
 *           AI_API_URL (default OpenRouter), AI_MODEL (default free Llama).
 * Without AI_API_KEY it answers 503 and the widget falls back to local rules.
 */

const SYSTEM = `Eres "CM Assistant", el asistente virtual de CM Dev Studio (estudio de Cristian Mosquera, desarrollo web full-stack y apps a medida). Respondes en el idioma del usuario (español o inglés). Tono profesional, claro, directo y entusiasta. Respuestas cortas salvo que pidan detalle.

Vendes: Landing Pages, Sitios Corporativos, E-Commerce y SaaS a medida (React, Next.js, Node.js, PostgreSQL, Prisma, Tailwind). Cero plantillas WordPress. Todo se cotiza en USD: Landing desde $300, Corporativos desde $600, E-Commerce desde $1,200, SaaS desde $2,500; la cifra exacta depende del alcance.
Explicas en lenguaje simple: SEO (aparecer en Google), Rendimiento (95+/100), Responsive, Conversión, Seguridad (SSL), Pagos (Stripe, Wompi, PayPal).
Metodología: 1 Descubrimiento, 2 Arquitectura UX, 3 Desarrollo, 4 Despliegue + SEO.
Proyectos: Pintando Sueños (donaciones), AREM WORLD (e-commerce), Papelillo (Wompi), Matthew Journal (personal y privado: NO compartas enlaces ni detalles, di que se comparten en reunión).
Captura leads (nombre, tipo de proyecto, presupuesto USD) y dirige a WhatsApp: https://wa.me/573027472998 (CM Dev Studio, +57 3027472998). Nunca inventes URLs ni precios exactos.
Si piden video, demo o más información general, diles que aquí mismo en el chat pueden escribir "ver video" y se lo mostramos.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  // Rate limit simple en memoria: 12 req/min por IP.
  // Nota: en serverless es por instancia — frena abuso casual, no ataques
  // distribuidos. Para protección fuerte, activar Vercel Firewall / AI Gateway.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  const arr = ((globalThis.__cmHits?.get(ip)) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  if (!globalThis.__cmHits) globalThis.__cmHits = new Map();
  globalThis.__cmHits.set(ip, arr);
  if (globalThis.__cmHits.size > 2000) globalThis.__cmHits.delete(globalThis.__cmHits.keys().next().value);
  if (arr.length > 12) {
    res.setHeader('Retry-After', '60');
    return res.status(429).json({ error: 'RATE_LIMITED' });
  }
  try {
    const apiKey = process.env.AI_API_KEY;
    if (!apiKey) return res.status(503).json({ error: 'AI_NOT_CONFIGURED' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const lang = body.lang === 'en' ? 'en' : 'es';
    const history = Array.isArray(body.messages) ? body.messages.slice(-8) : [];
    const clean = history
      .filter((m) => m && typeof m.text === 'string')
      .map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text.slice(0, 500),
      }))
      .filter((m) => m.content.trim().length > 0);
    if (clean.length === 0) return res.status(400).json({ error: 'EMPTY' });

    const base = (process.env.AI_API_URL || 'https://openrouter.ai/api/v1').replace(/\/$/, '');
    // Cadena de modelos: el preferido primero, respaldos si el free está saturado.
    const preferred = process.env.AI_MODEL || 'google/gemma-4-26b-a4b-it:free';
    const models = [preferred, ...[
      'google/gemma-4-26b-a4b-it:free',
      'nvidia/nemotron-3-ultra-550b-a55b:free',
      'cohere/north-mini-code:free',
    ].filter((m) => m !== preferred)];

    const payload = (model) => ({
      model,
      messages: [
        { role: 'system', content: SYSTEM + (lang === 'en' ? ' Answer in English.' : ' Responde en español.') },
        ...clean,
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    let reply = '';
    let lastStatus = 0;
    for (const model of models) {
      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 12000);
      try {
        const r = await fetch(`${base}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://cm-portfolio-cristians-projects-5a37e367.vercel.app',
            'X-Title': 'CM Studio Assistant',
          },
          body: JSON.stringify(payload(model)),
          signal: ctrl.signal,
        });
        clearTimeout(to);
        if (!r.ok) { lastStatus = r.status; continue; }
        const data = await r.json();
        reply = data?.choices?.[0]?.message?.content?.trim() || '';
        if (reply) break;
      } catch (e) {
        clearTimeout(to);
        console.error('chat try', model, e?.message || e);
      }
    }
    if (!reply) {
      console.error('chat upstream all-failed, lastStatus', lastStatus);
      return res.status(502).json({ error: 'AI_UPSTREAM' });
    }
    return res.status(200).json({ reply: reply.replace(/\*\*/g, '').slice(0, 1200) });
  } catch (err) {
    console.error('chat error', err);
    return res.status(500).json({ error: 'AI_ERROR' });
  }
}
