import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LEGAL, UPDATED } from '../legal';

// Diálogo accesible para los 4 documentos. Se abre con evento `cm-open-legal`.
export default function LegalDialog({ lang }) {
  const [doc, setDoc] = useState(null);
  const closeRef = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    const open = (e) => {
      prevFocus.current = document.activeElement;
      setDoc(typeof e.detail === 'string' ? e.detail : 'privacy');
    };
    window.addEventListener('cm-open-legal', open);
    return () => window.removeEventListener('cm-open-legal', open);
  }, []);

  useEffect(() => {
    if (!doc) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc]);

  const close = () => setDoc(null);
  if (!doc) return null;
  const data = LEGAL[lang][doc];
  const biz = LEGAL[lang].business;
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={close}>
      <div role="dialog" aria-modal="true" aria-label={data.title}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-700 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white">{data.title}</h2>
            <p className="text-xs text-slate-400 mt-1">{UPDATED[lang]} · {biz.name} · {biz.location} · {biz.contact}</p>
          </div>
          <button ref={closeRef} onClick={close} aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={data.title}>
          {['privacy', 'terms', 'cookies', 'refunds'].map((k) => (
            <button key={k} onClick={() => setDoc(k)} aria-pressed={doc === k}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${doc === k ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-blue-500'}`}>
              {LEGAL[lang][k].title}
            </button>
          ))}
        </div>
        <div className="mt-4 space-y-3">
          {data.body.map((p, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">{p}</p>
          ))}
          <p className="text-xs text-slate-500 leading-relaxed">{biz.tax}</p>
        </div>
      </div>
    </div>
  );
}
