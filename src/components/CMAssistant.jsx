import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { safeTrack } from '../analytics';
import Logo from './Logo';
import { STRINGS } from '../i18n';

const WA_LINK = 'https://wa.me/573027472998';
// Video mobile (22s, vertical con voz): solo se sirve bajo demanda desde el chat,
// nunca se incrusta en la página para no pesar la carga inicial.
const VIDEO_SRC = '/video-cm-mobile.mp4';
const VIDEO_POSTER = '/video-cm-mobile.jpg';

function detectIntent(text) {
  const s = text.toLowerCase();
  const has = (...ws) => ws.some((word) => s.includes(word));
  if (has('precio', 'costo', 'cuánto', 'cuanto', 'presupuesto', 'price', 'cost', 'budget', 'how much', 'usd')) return 'pricing';
  if (has('servicio', 'seo', 'pago', 'diseño', 'diseno', 'velocidad', 'responsive', 'service', 'payment', 'design', 'speed')) return 'services';
  if (has('proyecto', 'trabajo', 'ejemplo', 'project', 'work', 'portfolio', 'client')) return 'projects';
  if (has('contacto', 'whatsapp', 'agendar', 'llamada', 'llamar', 'reunion', 'reunión', 'contact', 'call', 'meeting', 'book', 'hablar')) return 'contact';
  if (has('video', 'demo', 'muestra', 'presentaci', 'mira el', 'watch', 'show me', 'mas info', 'más info', 'mas informacion', 'más información', 'mayor informacion', 'mayor información', 'mas detalles', 'más detalles', 'cuentame', 'cuéntame', 'hablame', 'háblame', 'explicame', 'explícame')) return 'video';
  if (has('hola', 'buenas', 'hello', 'hey')) return 'greet';
  return 'fallback';
}

export default function CMAssistant({ lang }) {
  const t = STRINGS[lang].chat;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: t.greet }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [seen, setSeen] = useState(false);
  const bodyRef = useRef(null);
  const timer = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const replyLocal = (intent) => {
    setTyping(true);
    timer.current = setTimeout(() => {
      if (intent === 'video') {
        setMessages((m) => [...m, { from: 'bot', text: t.videoReply, video: VIDEO_SRC, poster: VIDEO_POSTER }]);
      } else {
        setMessages((m) => [...m, { from: 'bot', text: intent === 'greet' ? t.greet : t.answers[intent] }]);
      }
      setTyping(false);
    }, 900);
  };

  const replyBackend = async (history) => {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 25000);
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          messages: history.slice(-8).map((m) => ({ from: m.from, text: m.text })),
        }),
        signal: ctrl.signal,
      });
      clearTimeout(timeout);
      if (!r.ok) return null;
      const data = await r.json();
      return typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
    } catch {
      clearTimeout(timeout);
      return null;
    }
  };

  const send = (text) => {
    const clean = text.trim();
    if (!clean || typing) return;
    const next = [...messages, { from: 'user', text: clean }];
    setMessages(next);
    setInput('');
    // El video se entrega siempre en local (sin backend): es contenido propio fijo.
    if (detectIntent(clean) === 'video') {
      safeTrack('chat_video');
      replyLocal('video');
      return;
    }
    setTyping(true);
    replyBackend(next).then((answer) => {
      clearTimeout(timer.current);
      if (answer) {
        setMessages((m) => [...m, { from: 'bot', text: answer }]);
        setTyping(false);
      } else {
        replyLocal(detectIntent(clean));
      }
    });
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 md:right-6 z-[90] w-[min(92vw,380px)] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex flex-col">
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-700 to-indigo-600">
            <Logo className="w-10 h-10" />
            <div className="flex-1">
              <div className="font-bold text-white text-sm">{t.title}</div>
              <div className="text-[11px] text-blue-100 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {t.online}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-all" aria-label={t.close}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={bodyRef} className="h-[340px] overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from === 'bot' ? 'bg-slate-800 text-slate-200 rounded-tl-sm' : 'bg-blue-600 text-white ml-auto rounded-tr-sm'}`}>
                {m.text}
                {m.video && (
                  <video
                    src={m.video}
                    poster={m.poster}
                    controls
                    playsInline
                    preload="none"
                    aria-label={lang === 'es' ? 'Video promocional de THARON' : 'THARON promo video'}
                    className="mt-2 w-full rounded-xl bg-black"
                  />
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-1.5 px-3.5 py-3 rounded-2xl rounded-tl-sm bg-slate-800 w-fit">
                {[0, 150, 300].map((d) => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            )}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {t.chips.map((c) => (
              <button key={c} onClick={() => send(c)} className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 transition-all">
                {c}
              </button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-slate-800 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              maxLength={500}
              autoComplete="off"
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all" aria-label={lang === 'es' ? 'Enviar mensaje' : 'Send message'}>
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="px-4 pb-1 text-[11px] text-slate-500 leading-relaxed">
            {lang === 'es'
              ? 'Al escribir aceptas nuestra Política de Privacidad. No compartas contraseñas ni datos sensibles.'
              : 'By typing you accept our Privacy Policy. Do not share passwords or sensitive data.'}
          </p>

          <a href={WA_LINK} target="_blank" rel="noreferrer" className="mx-3 mb-3 py-2.5 rounded-xl bg-emerald-600/15 hover:bg-emerald-600/25 border border-emerald-600/30 text-emerald-400 text-xs font-bold text-center transition-all">
            {t.whatsapp}
          </a>
        </div>
      )}

      <button
        onClick={() => { setOpen((o) => !o); setSeen(true); if (!open) safeTrack('chat_open'); }}
        aria-label={open ? t.close : t.open}
        className="fixed bottom-5 right-4 md:right-6 z-[90] w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/40 flex items-center justify-center transition-all hover:scale-105"
      >
        {!seen && !open && <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping" />}
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </>
  );
}
