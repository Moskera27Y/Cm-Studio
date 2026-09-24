import React, { useState, useEffect } from 'react';
import { getConsent, setConsent } from '../consent';

export default function CookieBanner({ lang, strings }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!getConsent()) {
      const t = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(t);
    }
  }, []);
  useEffect(() => {
    const reopen = () => setVisible(true);
    window.addEventListener('cm-open-cookies', reopen);
    return () => window.removeEventListener('cm-open-cookies', reopen);
  }, []);
  if (!visible) return null;
  return (
    <div role="dialog" aria-live="polite" aria-label={strings.title}
      className="fixed bottom-4 left-4 right-4 sm:right-auto z-[120] max-w-md rounded-2xl border border-slate-700 bg-slate-950/95 backdrop-blur p-5 shadow-2xl">
      <p className="text-sm font-bold text-white">{strings.title}</p>
      <p className="mt-1 text-xs text-slate-400 leading-relaxed">{strings.text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => { setConsent(false); setVisible(false); }}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all">
          {strings.reject}
        </button>
        <button onClick={() => { setConsent(true); setVisible(false); }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
          {strings.accept}
        </button>
        <button onClick={() => { window.dispatchEvent(new CustomEvent('cm-open-legal', { detail: 'cookies' })); }}
          className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm underline underline-offset-4">
          {strings.more}
        </button>
      </div>
    </div>
  );
}
