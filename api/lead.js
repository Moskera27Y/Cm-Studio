/**
 * POST /api/lead — guarda cotizaciones en Postgres (Neon).
 * Env var: DATABASE_URL (connection string de Neon).
 * Sin DATABASE_URL responde 503 y el frontend sigue con el flujo WhatsApp.
 * Crea la tabla `leads` sola si no existe.
 */
import { neon } from '@neondatabase/serverless';

const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const url = process.env.DATABASE_URL;
  if (!url) return res.status(503).json({ error: 'LEAD_STORE_NOT_CONFIGURED' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const type = str(body.type, 60);
    const extras = Array.isArray(body.extras)
      ? body.extras.map((e) => str(e, 80)).filter(Boolean).slice(0, 10).join(' | ')
      : '';
    const min = Number.isFinite(+body.min) ? Math.round(+body.min) : 0;
    const max = Number.isFinite(+body.max) ? Math.round(+body.max) : 0;
    const lang = body.lang === 'en' ? 'en' : 'es';
    if (!type || min <= 0) return res.status(400).json({ error: 'EMPTY' });

    const sql = neon(url);
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        extras TEXT DEFAULT '',
        min INT NOT NULL,
        max INT NOT NULL,
        lang TEXT DEFAULT 'es',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )`;
    await sql`
      INSERT INTO leads (type, extras, min, max, lang)
      VALUES (${type}, ${extras}, ${min}, ${max}, ${lang})`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('lead error', err);
    return res.status(500).json({ error: 'LEAD_ERROR' });
  }
}
