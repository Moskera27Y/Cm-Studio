import React, { useState, useEffect } from 'react';
import Logo from './Logo';

// Intro de carga solo en móvil: overlay con logo que se desvanece.
// Solo primera vista por sesión, solo pantallas <=768px,
// y se omite con prefers-reduced-motion.
export default function MobileIntro() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('cm-intro')) return;
    } catch { /* sin sessionStorage: mostrar igual */ }
    setShow(true);
    const t1 = setTimeout(() => setLeaving(true), 1250);
    const t2 = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem('cm-intro', '1'); } catch { /* noop */ }
    }, 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!show) return null;
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] bg-[#07090e] flex flex-col items-center justify-center gap-5 px-8 ${leaving ? 'intro-out' : ''}`}
    >
      <Logo className="intro-logo w-20 h-20 drop-shadow-2xl" />
      <div className="intro-text text-center">
        <p className="font-black tracking-[0.35em] text-white text-lg pl-2">CM STUDIO</p>
        <p className="text-[11px] tracking-[0.2em] text-blue-400 mt-2 uppercase">Desarrollo web elite</p>
      </div>
      <div className="w-40 h-1 rounded-full bg-slate-800 overflow-hidden">
        <div className="intro-bar h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      </div>
    </div>
  );
}
