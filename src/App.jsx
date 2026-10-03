import React, { useState, useEffect } from 'react';
import {
  Code2, Sparkles, CheckCircle2, ArrowRight, Zap,
  Globe, Check, MessageSquare, Mail, X,
  Menu, ChevronDown, Calculator, MonitorSmartphone
} from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import MobileIntro from './components/MobileIntro';
import Logo from './components/Logo';
import CMAssistant from './components/CMAssistant';
import { STRINGS } from './i18n';
import { safeTrack } from './analytics';
import CookieBanner from './components/CookieBanner';
import LegalDialog from './components/LegalDialog';

const PROJECTS_BASE = [
  {
    id: 'pintando-suenos',
    title: 'Pintando Sueños',
    category: 'ngo',
    metrics: { speed: '99/100', SEO: '100%', conversion: '+45%' },
    stack: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'PayPal'],
    color: 'from-blue-500/20 to-cyan-500/20',
    url: 'www.pintandosueños.com',
    liveUrl: 'https://www.pintandosueños.com',
    monogram: 'PS',
    year: '2024',
  },
  {
    id: 'arem-world',
    title: 'AREM WORLD',
    category: 'ecommerce',
    metrics: { speed: '98/100', SEO: '98%', conversion: '+60%' },
    stack: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
    color: 'from-purple-500/20 to-pink-500/20',
    url: 'arem-mu.vercel.app',
    liveUrl: 'https://arem-mu.vercel.app',
    monogram: 'AW',
    year: '2024',
  },
  {
    id: 'papelillo',
    title: 'Papelillo',
    category: 'ecommerce',
    metrics: { speed: '98/100', SEO: '99%', conversion: '+55%' },
    stack: ['Next.js', 'Prisma', 'Neon', 'Wompi'],
    color: 'from-rose-500/20 to-orange-500/20',
    url: 'papelillo-web-lilac.vercel.app',
    liveUrl: 'https://papelillo-web-lilac.vercel.app',
    monogram: 'PA',
    year: '2025',
  },
  {
    id: 'matthew-journal',
    title: 'Matthew Journal',
    category: 'saas',
    metrics: { speed: '99/100', SEO: '100%', conversion: '+70%' },
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    color: 'from-amber-500/20 to-rose-500/20',
    url: 'matthew-journal.vercel.app',
    liveUrl: 'https://matthew-journal.vercel.app',
    monogram: 'MJ',
    noFrame: true,
    private: true,
    year: '2025',
  },
];

const STACK = ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'Neon', 'Stripe', 'Wompi', 'PayPal', 'Vercel'];

// Contador animado: 0 → número al entrar en viewport
function Stat({ value }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(null);
  const m = String(value).match(/^(\d+)(.*)$/);
  React.useEffect(() => {
    if (!m) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(Number(m[1])); return; }
    const el = ref.current;
    if (!el) return;
    const target = Number(m[1]);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1300;
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  if (!m) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{n === null ? 0 : n}{m[2]}</span>;
}

// Efecto máquina de escribir (una vez, respeta reduced-motion)
function Typewriter({ text, className }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(text.length); return; }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 24);
    return () => clearInterval(id);
  }, [text]);
  return (
    <p className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {n < text.length && <span className="type-caret" aria-hidden="true" />}
    </p>
  );
}

// Spotlight: glow que sigue el mouse dentro de la tarjeta
const spotMove = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};

// Laboratorio: calidad comprobable en vivo
function LabSection({ t }) {
  const [resp, setResp] = React.useState('mobile');
  const [motion, setMotion] = React.useState(0);
  const [dur, setDur] = React.useState(900);
  const [run, setRun] = React.useState(0);
  const [race, setRace] = React.useState(false);
  const raceRef = React.useRef(null);
  const EASINGS = ['cubic-bezier(0.22, 1, 0.36, 1)', 'cubic-bezier(0.68, -0.4, 0.27, 1.4)', 'linear'];
  React.useEffect(() => {
    const el = raceRef.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setRace(true); io.disconnect(); } });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const respW = resp === 'mobile' ? '45%' : resp === 'tablet' ? '75%' : '100%';
  const respLabel = resp === 'mobile' ? t.responsive.mobile : resp === 'tablet' ? t.responsive.tablet : t.responsive.desktop;
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 01 · Velocidad */}
      <div ref={raceRef} className="p-5 sm:p-8 md:p-10 rounded-3xl bg-[#EFE7D6]/40 border border-[#DCD2BE]">
        <div className="flex items-start gap-5">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1C1917] to-[#57534E] flex items-center justify-center shadow-lg shadow-black/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-[#C2410C]">01</p>
            <h3 className="text-2xl font-bold mt-1">{t.speed.title}</h3>
            <p className="text-[#57534E] mt-2 max-w-2xl leading-relaxed">{t.speed.desc}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mt-8">
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-[#57534E]">{t.speed.avg}</span><span className="font-bold text-rose-400">{t.speed.slowTime}</span></div>
            <div className="h-4 rounded-full bg-[#E7DCC3] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-[1400ms] ease-out" style={{ width: race ? '92%' : '4%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-[#57534E]">{t.speed.ours}</span><span className="font-bold text-[#047857]">{t.speed.fastTime}</span></div>
            <div className="h-4 rounded-full bg-[#E7DCC3] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-[400ms] ease-out" style={{ width: race ? '9%' : '4%' }} />
            </div>
          </div>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#047857]"><CheckCircle2 className="w-4 h-4" />{t.speed.verdict}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 02 · Responsive */}
        <div className="min-w-0 p-5 sm:p-8 rounded-3xl bg-[#EFE7D6]/40 border border-[#DCD2BE] space-y-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C2410C] to-[#9A3412] flex items-center justify-center shadow-lg shadow-black/20">
              <MonitorSmartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#2F5D50]">02</p>
              <h3 className="text-xl font-bold mt-1">{t.responsive.title}</h3>
              <p className="text-[#57534E] mt-1.5 text-sm leading-relaxed">{t.responsive.desc}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['mobile', 'tablet', 'desktop'].map((k) => (
              <button
                key={k}
                onClick={() => setResp(k)}
                aria-pressed={resp === k}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${resp === k ? 'bg-[#C2410C] text-white shadow-lg shadow-blue-900/40' : 'bg-[#E7DCC3]/80 text-[#57534E] hover:text-[#1C1917]'}`}
              >
                {t.responsive[k]}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-[#FFFDF8] border border-[#DCD2BE] overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#DCD2BE]/80">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBBFA1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBBFA1]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#CBBFA1]" />
              <span className="ml-2 text-[11px] text-slate-500 truncate">tu-sitio.com · {respLabel}</span>
            </div>
            <div className="h-[210px] flex items-start justify-center p-4 overflow-hidden">
              <div className="transition-all duration-500 rounded-lg bg-[#EFE7D6] border border-[#C9BCA1] p-3 space-y-2 overflow-hidden" style={{ width: respW, maxWidth: '100%' }}>
                <div className="h-2 w-2/3 rounded bg-[#C2410C]/70" />
                <div className="h-2 w-full rounded bg-[#CBBFA1]" />
                <div className="h-2 w-5/6 rounded bg-[#CBBFA1]" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-5 flex-1 rounded-md bg-[#C2410C]" />
                  <div className="h-5 flex-1 rounded-md bg-[#CBBFA1]" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{t.responsive.note}</p>
        </div>
        {/* 03 · Movimiento */}
        <div className="min-w-0 p-5 sm:p-8 rounded-3xl bg-[#EFE7D6]/40 border border-[#DCD2BE] space-y-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2F5D50] to-[#1D4D3B] flex items-center justify-center shadow-lg shadow-black/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-[#2F5D50]">03</p>
              <h3 className="text-xl font-bold mt-1">{t.ease.title}</h3>
              <p className="text-[#57534E] mt-1.5 text-sm leading-relaxed">{t.ease.desc}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {t.ease.styles.map((c, i) => (
              <button
                key={c}
                onClick={() => { setMotion(i); setRun((r) => r + 1); }}
                aria-pressed={motion === i}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${motion === i ? 'bg-[#C2410C] text-white shadow-lg shadow-blue-900/40' : 'bg-[#E7DCC3]/80 text-[#57534E] hover:text-[#1C1917]'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-xs text-[#57534E] mb-1.5"><span>{t.ease.duration}</span><span className="font-bold">{dur}ms</span></div>
            <input
              type="range" min="300" max="2000" step="100" value={dur}
              onChange={(e) => setDur(Number(e.target.value))}
              aria-label={t.ease.duration}
              className="w-full accent-[#C2410C]"
            />
          </div>
          <div className="h-[64px] rounded-2xl bg-[#FFFDF8] border border-[#DCD2BE] relative overflow-hidden">
            <div
              key={run}
              className="lab-ball absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C2410C] to-[#2F5D50]"
              style={{ animation: `labSlide ${dur}ms ${EASINGS[motion]} forwards` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-500 leading-relaxed">{t.ease.note}</p>
            <button onClick={() => setRun((r) => r + 1)} className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-[#E7DCC3] hover:bg-[#CBBFA1] text-[#44403C] transition-all">
              {t.ease.play}
            </button>
          </div>
        </div>
      </div>

      {/* Franja: todo incluido */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 rounded-2xl border border-[#2F5D50]/30 bg-[#2F5D50]/5">
        <span className="text-sm font-bold text-[#1D4D3B]">{t.included.title}</span>
        {t.included.items.map((it) => (
          <span key={it} className="inline-flex items-center gap-2 text-sm text-[#44403C]"><Check className="w-4 h-4 text-[#047857]" />{it}</span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModal, setActiveModal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [qType, setQType] = useState(0);
  const [qExtras, setQExtras] = useState([]);
  const [frameLoaded, setFrameLoaded] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [lang, setLang] = useState(() => localStorage.getItem('cm-lang') || 'es');

  const t = STRINGS[lang];
  const projects = PROJECTS_BASE.map((p) => ({ ...p, ...t.projectsData[p.id] }));

  // Estado del Formulario (solo datos necesarios; nada se guarda aquí, se envía por WhatsApp)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: t.contact.types[0],
    budget: '$300 - $600 USD',
    details: ''
  });
  const [privacyOk, setPrivacyOk] = useState(false);
  const [formError, setFormError] = useState('');

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!privacyOk) {
      setFormError(t.consent.required);
      return;
    }
    setFormError('');
    const phone = "573027472998";
    const w = t.contact.wa;
    const lines = [
      w.greet,
      '',
      `${w.name}: ${formData.name}`,
      `${w.email}: ${formData.email}`,
      `${w.type}: ${formData.projectType}`,
      `${w.budget}: ${formData.budget}`,
      `${w.details}: ${formData.details}`,
    ];
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    safeTrack('contact_submit', { type: formData.projectType });
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const selected = projects.find(p => p.id === activeModal);

  // Cotizador: base por tipo + extras
  const QUOTE_BASE = [300, 600, 1200, 2500];
  const quoteTotal = QUOTE_BASE[qType] + qExtras.reduce((a, i) => a + t.quote.extrasList[i].price, 0);
  // Cotizador: genera PDF + abre WhatsApp con el resumen
  const handleQuotePDF = async () => {
    const min = quoteTotal;
    const max = Math.round(quoteTotal * 1.3);
    const fmt = (n) => n.toLocaleString('en-US');
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.setFillColor(7, 9, 14);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('THARON', 15, 17);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`${t.quote.pdfTitle} — ${new Date().toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US')}`, 15, 28);
    let y = 54;
    doc.setTextColor(20, 20, 20);
    doc.setFontSize(12);
    doc.text(`${t.quote.type}: ${t.contact.types[qType]} — $${fmt(QUOTE_BASE[qType])} USD`, 15, y);
    y += 10;
    if (qExtras.length > 0) {
      doc.text(`${t.quote.extras}:`, 15, y);
      y += 8;
      doc.setFontSize(11);
      qExtras.forEach((i) => {
        doc.text(`- ${t.quote.extrasList[i].label} — +$${fmt(t.quote.extrasList[i].price)} USD`, 20, y);
        y += 7;
      });
      y += 3;
    }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${t.quote.estimated}: $${fmt(min)} - $${fmt(max)} USD`, 15, y);
    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 110);
    doc.text(t.quote.pdfValid, 15, y);
    y += 7;
    doc.text('THARON · https://wa.me/573027472998', 15, y);
    try {
      doc.save('cotizacion-tharon.pdf');
    } catch {
      // Si el navegador bloquea la descarga, igual se abre WhatsApp con el resumen
    }
    const lines = [
      t.quote.waGreet,
      '',
      `${t.quote.type}: ${t.contact.types[qType]}`,
      ...qExtras.map((i) => `+ ${t.quote.extrasList[i].label} ($${t.quote.extrasList[i].price} USD)`),
      `${t.quote.estimated}: $${min} - $${max} USD`,
    ];
    // Guardar lead en DB (no bloquea: si falla, igual se abre WhatsApp)
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lang,
        type: t.contact.types[qType],
        extras: qExtras.map((i) => t.quote.extrasList[i].label),
        min,
        max,
      }),
    }).catch(() => {});
    safeTrack('quote_generated', { type: t.contact.types[qType], total: min });
    window.open(`https://wa.me/573027472998?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  // Idioma: <html lang> + persistencia
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('cm-lang', lang);
    setFormData((f) => ({ ...f, projectType: STRINGS[lang].contact.types[0] }));
  }, [lang]);

  // Modal: cerrar con Escape + bloquear scroll del fondo
  useEffect(() => {
    if (!activeModal) return;
    setFrameLoaded(false);
    const onKey = (e) => { if (e.key === 'Escape') setActiveModal(null); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [activeModal]);

  // Barra de progreso de scroll
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setScrollPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Aparición suave de secciones al hacer scroll
  useEffect(() => {
    const els = document.querySelectorAll('main section');
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#1C1917] font-sans selection:bg-[#C2410C] selection:text-white">
      <MobileIntro />
      <a href="#contacto" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#C2410C] focus:text-white">
        {t.nav.cta}
      </a>
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#F6F1E7]/80 border-b border-[#DCD2BE]/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 drop-shadow-lg" />
            <span className="font-bold text-xl tracking-tight text-[#1C1917]">
              THARON
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#57534E] font-medium" aria-label="Principal">
            <a href="#filosofia" className="hover:text-[#C2410C] transition-colors">{t.nav.about}</a>
            <a href="#metodo" className="hover:text-[#C2410C] transition-colors">{t.nav.method}</a>
            <a href="#servicios" className="hover:text-[#C2410C] transition-colors">{t.nav.services}</a>
            <a href="#proyectos" className="hover:text-[#C2410C] transition-colors">{t.nav.projects}</a>
            <a href="#precios" className="hover:text-[#C2410C] transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-[#C2410C] transition-colors">{t.nav.faq}</a>
            <a href="#contacto" className="px-5 py-2.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold transition-all shadow-lg shadow-[#C2410C]/25">
              {t.nav.cta}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Selector de idioma */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#EFE7D6] border border-[#DCD2BE] text-xs font-bold">
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                    lang === l ? 'bg-[#C2410C] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {/* Hamburguesa móvil */}
            <button
              className="md:hidden p-2.5 rounded-lg bg-[#EFE7D6] border border-[#DCD2BE] text-[#44403C]"
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={(e) => { if (e.key === 'Escape') setMenuOpen(false); }}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t.modal.close : 'Menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Panel móvil */}
        {menuOpen && (
          <nav id="mobile-menu" className="md:hidden border-t border-[#DCD2BE] bg-[#F6F1E7]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1 text-sm font-medium" aria-label="Móvil">
            {[
              ['#filosofia', t.nav.about], ['#metodo', t.nav.method], ['#servicios', t.nav.services],
              ['#proyectos', t.nav.projects], ['#precios', t.nav.pricing], ['#faq', t.nav.faq],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2.5 px-2 rounded-lg text-[#44403C] hover:bg-[#EFE7D6] hover:text-[#1C1917] transition-colors">
                {label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="mt-2 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold text-center transition-all">
              {t.nav.cta}
            </a>
          </nav>
        )}
      </header>
      {/* Barra de progreso de scroll */}
      <div
        aria-hidden="true"
        className="fixed top-20 left-0 h-[2px] z-40 bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#2F5D50]"
        style={{ width: `${scrollPct}%` }}
      />

      {/* Main Content */}
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-32">
        {/* Hero Section: asimétrico editorial */}
        <section className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="space-y-7 md:col-span-7">
            <p className="hero-in dateline dateline-left" style={{ animationDelay: '0ms' }}>
              {lang === 'es' ? 'Cali — Colombia · 2026' : 'Cali — Colombia · 2026'}
            </p>
            <h1 className="hero-in text-5xl md:text-7xl font-black tracking-tight leading-[1.02]" style={{ animationDelay: '120ms' }}>
              {t.hero.titleA} <span className="italic text-[#9A3412]">{t.hero.titleB}</span>
            </h1>
            <Typewriter
              key={lang}
              text={t.hero.sub}
              className="hero-in text-lg md:text-xl text-[#57534E] leading-relaxed max-w-xl min-h-[84px] md:min-h-[72px]"
            />
            <div className="hero-in flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2" style={{ animationDelay: '360ms' }}>
              <a href="#contacto" className="px-8 py-4 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] font-semibold text-white transition-all shadow-[5px_5px_0_#1C1917] flex items-center justify-center gap-2">
                {t.hero.cta1} <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#proyectos" className="px-8 py-4 rounded-lg bg-[#EFE7D6] border-2 border-[#1C1917] hover:bg-[#E7DCC3] font-semibold text-[#1C1917] transition-all flex items-center justify-center gap-2">
                {t.hero.cta2}
              </a>
            </div>
          </div>
          <aside className="hero-in md:col-span-5" style={{ animationDelay: '240ms' }} aria-label={t.quote.title}>
            <div className="rounded-none border-2 border-[#1C1917] bg-[#FFFDF8] shadow-[8px_8px_0_#1C1917]">
              <div className="flex items-center justify-between border-b-2 border-[#1C1917] px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{t.quote.title}</span>
                <Calculator className="w-4 h-4 text-[#9A3412]" />
              </div>
              <ul className="divide-y divide-[#E3DACA] text-sm">
                {t.pricing.plans.map((plan, i) => (
                  <li key={i} className="flex items-baseline justify-between gap-3 px-5 py-3">
                    <span className="font-semibold">{plan.name}</span>
                    <span className="flex-1 border-b border-dotted border-[#C9BCA1] -translate-y-1" aria-hidden="true" />
                    <span className="font-black text-[#9A3412] whitespace-nowrap">{plan.price}</span>
                  </li>
                ))}
              </ul>
              <a href="#cotizador" className="block border-t-2 border-[#1C1917] bg-[#1C1917] px-5 py-3.5 text-center text-sm font-bold text-[#F6F1E7] hover:bg-[#9A3412] transition-colors">
                {t.pricing.cta} →
              </a>
            </div>
          </aside>
        </section>

        {/* Franja de especificaciones */}
        <div className="overflow-hidden border-y-2 border-[#1C1917] py-4" aria-hidden="true">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[#6F665A] mb-3">{t.marquee.label}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6">
            {STACK.map((s) => (
              <React.Fragment key={s}>
                <span className="text-sm font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">{s}</span>
                <span className="text-[#9A3412] text-xs" aria-hidden="true">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Quiénes somos + stats */}
        <section id="filosofia" className="space-y-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center max-w-5xl mx-auto">
            <figure className="md:col-span-4">
              <img
                src="/cristian-mosquera.jpg"
                alt="Cristian Mosquera, desarrollador web en Cali, fundador de THARON"
                width="861"
                height="1065"
                loading="lazy"
                className="w-full max-w-[320px] mx-auto rounded-none border-2 border-[#1C1917] shadow-[8px_8px_0_#1C1917]"
              />
              <figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#9A3412]">
                Cristian Mosquera · Cali
              </figcaption>
            </figure>
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">{t.about.title}</h2>
              <p className="text-[#57534E] leading-relaxed">{t.about.text}</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9A3412]">{t.about.byline}</p>
            </div>
          </div>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.about.stats.map((s, i) => (
              <div key={i} className="pt-4 border-t-2 border-[#1C1917] text-center hover:border-[#C2410C] transition-all">
                <dt className="order-2 text-xs text-[#57534E] mt-1">{s.label}</dt>
                <dd className="order-1 text-3xl font-black text-[#9A3412]"><Stat key={`${lang}-${s.label}`} value={s.value} /></dd>
                <dd className="order-3 text-[11px] text-[#6F665A] mt-1">{s.m}</dd>
              </div>
            ))}
          </dl>
          <p className="text-center text-[11px] text-slate-500">{t.disclaimers.metrics}</p>
        </section>

        {/* Metodología: línea de tiempo */}
        <section id="metodo" className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4 space-y-4">
            <p className="dateline dateline-left">{lang === 'es' ? 'Cómo trabajo' : 'How I work'}</p>
            <h2 className="text-3xl md:text-4xl font-bold">{t.method.title}</h2>
            <p className="text-[#57534E]">{t.method.sub}</p>
          </div>
          <ol className="md:col-span-8 border-l-2 border-[#1C1917] ml-2 space-y-8">
            {t.method.steps.map((m, i) => (
              <li key={i} className="relative pl-8">
                <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-[#F6F1E7] border-[3px] border-[#C2410C]" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-black text-2xl text-[#9A3412]">{m.num}</span>
                  <h3 className="text-xl font-bold">{m.title}</h3>
                </div>
                <p className="mt-1 text-sm text-[#57534E] max-w-xl">{m.desc}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#2F5D50]">{m.meta}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Servicios / Conceptos explicados */}
        <section id="servicios" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.services.title}</h2>
            <p className="text-[#57534E]">{t.services.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {t.services.items.map((s, i) => {
              const n = String(i + 1).padStart(2, '0');
              return (
                <div key={i} className="border-t-2 border-[#1C1917] pt-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-black text-4xl text-[#9A3412]">{n}</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#6F665A]">{s.term}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-3 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-[#57534E] leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Laboratorio */}
        <section id="lab" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="dateline dateline-center justify-center">{t.lab.badge}</p>
            <h2 className="text-3xl md:text-4xl font-bold">{t.lab.title}</h2>
            <p className="text-[#57534E] leading-relaxed">{t.lab.sub}</p>
          </div>
          <LabSection t={t.lab} />
        </section>

        {/* Proyectos Showcase */}
        <section id="proyectos" className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">{t.projects.title}</h2>
              <p className="text-[#57534E] text-sm">{t.projects.sub}</p>
            </div>
            <div className="flex gap-2 bg-[#EFE7D6] p-1.5 rounded-xl border border-[#DCD2BE]">
              {['all', 'ngo', 'ecommerce', 'saas'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat ? 'bg-[#C2410C] text-white' : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {t.projects.filters[cat]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <div
                key={`${selectedCategory}-${p.id}`}
                onClick={() => setActiveModal(p.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveModal(p.id); } }}
                role="button"
                tabIndex={0}
                aria-label={`${t.projects.viewCase}: ${p.title}`}
                style={{ animationDelay: `${i * 90}ms` }}
                onMouseMove={spotMove}
                className="spot card-in p-6 rounded-2xl bg-[#FFFDF8] border border-[#DCD2BE] flex flex-col justify-between hover:border-[#C2410C]/60 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#C2410C]/10 text-[#C2410C] font-medium">
                    {p.tag}
                  </span>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="text-sm text-[#57534E]">{p.desc}</p>

                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-[#DCD2BE]/80 text-center">
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.speed}</div>
                      <div className="text-sm font-bold text-[#047857]">{p.metrics.speed}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.seo}</div>
                      <div className="text-sm font-bold text-[#C2410C]">{p.metrics.SEO}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.conversion}</div>
                      <div className="text-sm font-bold text-[#2F5D50]">{p.metrics.conversion}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-1 rounded-md bg-[#E7DCC3] text-[#44403C]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C2410C]">
                    {t.projects.viewCase} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Precios: tarifario */}
        <section id="precios" className="space-y-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7 space-y-3">
              <p className="dateline dateline-left">{lang === 'es' ? 'Tarifario 2026 · USD' : 'Rate card 2026 · USD'}</p>
              <h2 className="text-3xl md:text-4xl font-bold">{t.pricing.title}</h2>
              <p className="text-[#57534E]">{t.pricing.sub}</p>
            </div>
            <p className="md:col-span-5 text-sm text-[#57534E] md:text-right md:pb-1">{t.quote.pdfValid}</p>
          </div>
          <div className="border-t-2 border-[#1C1917]">
            {t.pricing.plans.map((plan, i) => (
              <article
                key={i}
                className={`grid gap-3 md:grid-cols-12 md:items-center border-b border-[#DCD2BE] py-6 ${i === 2 ? 'bg-[#C2410C]/5' : ''}`}
              >
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold">
                    {i === 2 && <span className="mr-2 inline-block -translate-y-0.5 bg-[#1C1917] px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-widest text-[#F6F1E7]">{t.pricing.popular}</span>}
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#57534E]">{plan.desc}</p>
                </div>
                <ul className="md:col-span-5 grid gap-1.5 sm:grid-cols-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#44403C]">
                      <Check className="w-4 h-4 mt-0.5 text-[#047857] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-3 md:text-right">
                  <p className="text-2xl font-black text-[#9A3412]">{plan.price} <span className="text-xs font-normal text-[#6F665A]">USD</span></p>
                  <a
                    href={`https://wa.me/573027472998?text=${encodeURIComponent(`${t.quote.waGreet} ${plan.name} (${plan.price} USD)`)}`}
                    target="_blank" rel="noreferrer"
                    onClick={() => safeTrack('plan_click', { plan: plan.name })}
                    className="mt-2 inline-block w-full md:w-auto px-5 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#C2410C] font-semibold text-sm text-[#F6F1E7] text-center transition-all"
                  >
                    {t.pricing.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Cotizador interactivo */}
        <section id="cotizador" className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#FFFDF8] border border-[#DCD2BE] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <p className="dateline dateline-center justify-center"><Calculator className="w-4 h-4" /> {t.quote.title}</p>
            <p className="text-[#57534E] text-sm">{t.quote.sub}</p>
          </div>
          <div>
            <label htmlFor="qtype" className="text-xs font-semibold text-[#44403C]">{t.quote.type}</label>
            <select
              id="qtype"
              value={qType}
              onChange={(e) => setQType(Number(e.target.value))}
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
            >
              {t.contact.types.map((type, i) => (
                <option key={type} value={i}>{type} — ${QUOTE_BASE[i].toLocaleString('en-US')} USD</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="text-xs font-semibold text-[#44403C]">{t.quote.extras}</legend>
            <div className="grid sm:grid-cols-2 gap-2 mt-1.5">
              {t.quote.extrasList.map((ex, i) => (
                <label key={i} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm cursor-pointer transition-all ${qExtras.includes(i) ? 'bg-[#C2410C]/15 border-[#C2410C]/60' : 'bg-[#F1EAD9] border-[#C9BCA1] hover:border-[#8A7F6A]'}`}>
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={qExtras.includes(i)}
                      onChange={() => setQExtras((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                      className="accent-[#C2410C] w-4 h-4"
                    />
                    {ex.label}
                  </span>
                  <span className="text-[#57534E] font-semibold">+${ex.price}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#F1EAD9] border border-[#C9BCA1]">
            <div className="text-center sm:text-left">
              <div className="text-xs text-slate-500">{t.quote.estimated} (USD)</div>
              <div className="text-3xl font-black text-[#047857]">${quoteTotal.toLocaleString('en-US')} – ${Math.round(quoteTotal * 1.3).toLocaleString('en-US')}</div>
              <div className="text-[11px] text-slate-500">{t.quote.rangeNote}</div>
            </div>
            <button
              onClick={handleQuotePDF}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-sm sm:text-base text-center leading-snug transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 shrink-0" /> <span>{t.quote.cta}</span>
            </button>
            <a
              href={`mailto:Moskera15@gmail.com?subject=${encodeURIComponent(`${t.quote.pdfTitle} - ${t.contact.types[qType]}`)}&body=${encodeURIComponent(`${t.quote.waGreet}\n\n${t.quote.type}: ${t.contact.types[qType]}\n${qExtras.map((i) => `+ ${t.quote.extrasList[i].label} ($${t.quote.extrasList[i].price} USD)`).join('\n')}\n${t.quote.estimated}: $${quoteTotal} - $${Math.round(quoteTotal * 1.3)} USD`)}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#1C1917] hover:bg-[#C2410C] font-bold text-[#F6F1E7] text-sm sm:text-base text-center leading-snug transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5 shrink-0" /> <span>{t.quote.emailCta}</span>
            </a>
          </div>
          <p className="text-[11px] text-slate-500 text-center">{t.quote.pdfNote}</p>
        </section>

        {/* Garantías */}
        <section id="garantias" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.guarantees.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {t.guarantees.items.map((g, i) => (
              <div key={i} className="border-t-2 border-[#1C1917] pt-4">
                <span className="font-black text-3xl text-[#2F5D50]">✓</span>
                <h3 className="text-base font-bold mt-2 mb-1.5">{g.title}</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-[#1C1917]">— Cristian Mosquera</p>
        </section>

        {/* Comparativa */}
        <section id="comparativa" className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.compare.title}</h2>
            <p className="text-[#57534E]">{t.compare.sub}</p>
          </div>
          <div className="overflow-x-auto rounded-none border-y-2 border-[#1C1917]">
            <table className="w-full text-sm min-w-[600px] bg-[#FFFFFF]">
              <thead>
                <tr className="border-b border-[#DCD2BE]">
                  <th className="text-left p-4 font-semibold text-[#57534E]" />
                  {t.compare.cols.map((c, i) => (
                    <th key={c} className={`p-4 text-center font-bold ${i === 0 ? 'text-[#C2410C] bg-[#C2410C]/10' : 'text-[#44403C]'}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map((r, i) => (
                  <tr key={i} className="border-b border-[#DCD2BE]/60 last:border-0">
                    <td className="p-4 font-semibold text-[#44403C]">{r.f}</td>
                    {r.v.map((cell, j) => (
                      <td key={j} className={`p-4 text-center ${j === 0 ? 'bg-[#C2410C]/10 font-semibold text-[#1C1917]' : 'text-[#57534E]'}`}>
                        {cell === 'yes'
                          ? <Check className="w-5 h-5 text-[#047857] mx-auto" />
                          : cell === 'no'
                            ? <X className="w-5 h-5 text-rose-500/70 mx-auto" />
                            : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-[11px] text-[#6F665A]">{t.compare.note}</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.faq.title}</h2>
            <p className="text-[#57534E]">{t.faq.sub}</p>
          </div>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <div key={i} className={`rounded-md border transition-all ${openFaq === i ? 'bg-[#EFE7D6] border-[#C2410C]/60' : 'bg-[#FFFFFF] border-[#DCD2BE]'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 text-[#C2410C] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm text-[#57534E] leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Formulario de Contacto Directo */}
        <section id="contacto" className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#FFFDF8] border border-[#DCD2BE] shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{t.contact.title}</h2>
            <p className="text-[#57534E] text-sm">{t.contact.sub}</p>
          </div>

          <form onSubmit={handleWhatsAppSend} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="f-name" className="text-xs font-semibold text-[#44403C]">{t.contact.name}</label>
                <input
                  id="f-name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder={t.contact.namePh}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
                />
              </div>
              <div>
                <label htmlFor="f-email" className="text-xs font-semibold text-[#44403C]">{t.contact.email}</label>
                <input
                  id="f-email"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  placeholder="correo@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="f-type" className="text-xs font-semibold text-[#44403C]">{t.contact.type}</label>
                <select
                  id="f-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
                >
                  {t.contact.types.map((type, i) => (
                    <option key={type} value={type}>{t.contact.typeLabels[i]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-budget" className="text-xs font-semibold text-[#44403C]">{t.contact.budget}</label>
                <select
                  id="f-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
                >
                  <option value="$300 - $600 USD">$300 - $600 USD</option>
                  <option value="$600 - $1,200 USD">$600 - $1,200 USD</option>
                  <option value="$1,200 - $2,500 USD">$1,200 - $2,500 USD</option>
                  <option value="$2,500+ USD">$2,500+ USD</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="f-details" className="text-xs font-semibold text-[#44403C]">{t.contact.details}</label>
              <textarea
                id="f-details"
                rows="3"
                maxLength={800}
                placeholder={t.contact.detailsPh}
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-[#F1EAD9] border border-[#C9BCA1] text-[#1C1917] focus:outline-none focus:border-[#C2410C] text-sm"
              />
            </div>

            <div className="rounded-xl border border-[#C9BCA1] bg-[#FFFDF8] px-4 py-3">
              <label htmlFor="f-privacy" className="flex items-start gap-3 text-xs text-[#44403C] leading-relaxed cursor-pointer">
                <input
                  id="f-privacy"
                  type="checkbox"
                  required
                  checked={privacyOk}
                  onChange={(e) => setPrivacyOk(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-500"
                />
                <span>
                  {t.consent.privacy}{' '}
                  <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('cm-open-legal', { detail: 'privacy' }))} className="underline underline-offset-4 hover:text-[#1C1917]">
                    {t.footer.privacy}
                  </button>
                  {' · '}
                  <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('cm-open-legal', { detail: 'terms' }))} className="underline underline-offset-4 hover:text-[#1C1917]">
                    {t.footer.terms}
                  </button>
                </span>
              </label>
              <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">{t.consent.note}</p>
              {formError && <p role="alert" className="mt-2 text-xs font-semibold text-red-400">{formError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-center leading-snug transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 shrink-0" /> <span>{t.contact.submit}</span>
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t-2 border-[#1C1917] bg-[#1C1917] text-[#E7E0D2]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-9 h-9" />
              <span className="font-bold text-lg tracking-tight text-[#F6F1E7]">THARON</span>
            </div>
            <p className="text-sm text-[#A8A29E] leading-relaxed max-w-xs">{t.footer.tag}</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-4">{t.footer.links}</h3>
            <ul className="space-y-2.5 text-sm text-[#D6D3D1]">
              {[
                ['#filosofia', t.nav.about], ['#metodo', t.nav.method], ['#servicios', t.nav.services],
                ['#proyectos', t.nav.projects], ['#precios', t.nav.pricing], ['#faq', t.nav.faq], ['#contacto', t.nav.cta],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="inline-block py-1.5 hover:text-[#E8A06C] transition-colors">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2.5 text-sm text-[#D6D3D1]">
              <li>
                <a href="https://wa.me/573027472998" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#6EE7B7] transition-colors">
                  <MessageSquare className="w-4 h-4" /> +57 302 747 2998
                </a>
              </li>
              <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> {t.footer.location}</li>
              <li className="text-xs text-[#A8A29E]">{t.footer.business}</li>
              <li>
                <a href="mailto:Moskera15@gmail.com" className="inline-flex items-center gap-2 hover:text-[#E8A06C] transition-colors">
                  <Mail className="w-4 h-4" /> Moskera15@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.sic.gov.co" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4 hover:text-[#E8A06C] transition-colors">
                  {t.footer.sic}
                </a>
              </li>
            </ul>
            <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-3">{t.footer.legal}</h3>
            <ul className="flex flex-wrap gap-2 text-xs">
              {[
                ['privacy', t.footer.privacy], ['terms', t.footer.terms],
                ['cookies', t.footer.cookies], ['refunds', t.footer.refunds],
              ].map(([doc, label]) => (
                <li key={doc}>
                  <button onClick={() => window.dispatchEvent(new CustomEvent('cm-open-legal', { detail: doc }))}
                    className="px-3 py-2 rounded-lg bg-transparent border border-[#4A4237] text-[#D6D3D1] hover:text-[#1C1917] hover:border-[#C2410C] transition-all">
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => window.dispatchEvent(new Event('cm-open-cookies'))}
                  className="px-3 py-2 rounded-lg bg-transparent border border-[#4A4237] text-[#D6D3D1] hover:text-[#1C1917] hover:border-[#C2410C] transition-all">
                  {t.footer.cookieSettings}
                </button>
              </li>
            </ul>
            <p className="mt-4 text-[11px] text-[#A8A29E] leading-relaxed max-w-xs">{t.footer.images}</p>
            <p className="mt-2 text-[11px] text-[#A8A29E] leading-relaxed max-w-xs">{t.footer.brands}</p>
            <a href="#contacto" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C2410C] hover:bg-[#9A3412] text-white text-sm font-semibold transition-all">
              {t.nav.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-[#4A4237]/60">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#A8A29E]">
            <span>© {new Date().getFullYear()} THARON. {t.footer.rights}</span>
            <span>{lang === 'es' ? 'Tipografía Fraunces + Inter · Hecho a mano en Cali' : 'Fraunces + Inter type · Handmade in Cali'}</span>
            <span className="inline-flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> React · Tailwind · Vercel</span>
          </div>
        </div>
      </footer>

      {/* Asistente virtual */}
      <CMAssistant key={lang} lang={lang} />
      <CookieBanner lang={lang} strings={t.cookie} />
      <LegalDialog lang={lang} />

      {/* Modal Caso de Estudio */}
      {selected && (
        <div
          className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog" aria-modal="true" aria-label={selected.title}
            className="modal-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#FFFDF8] border-2 border-[#1C1917] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vista previa del sitio */}
            <div className={`p-6 pb-0 bg-gradient-to-br ${selected.color}`}>
              <div className="rounded-t-2xl overflow-hidden border border-[#C9BCA1]/60 border-b-0">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#EFE7D6]">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  {selected.private ? (
                    <span className="ml-3 flex-1 text-xs text-[#57534E] bg-[#E7DCC3] rounded-lg px-3 py-1.5 truncate">
                      {selected.url}
                    </span>
                  ) : (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-3 flex-1 text-xs text-[#57534E] bg-[#E7DCC3] hover:bg-[#CBBFA1] hover:text-[#44403C] rounded-lg px-3 py-1.5 truncate transition-colors"
                    >
                      {selected.url}
                    </a>
                  )}
                </div>
                <div className="bg-[#FFFDF8] px-3 md:px-5 pt-4">
                  {selected.noFrame ? (
                    <div className="flex flex-col items-center justify-center gap-3 h-[380px] rounded-t-xl bg-gradient-to-br from-[#EFE7D6] to-[#FFFDF8] border border-[#DCD2BE] border-b-0 text-center px-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-rose-500/20">
                        {selected.monogram}
                      </div>
                      <div className="text-lg font-bold">{selected.title}</div>
                      <p className="text-sm text-[#57534E] max-w-xs">
                        {t.modal.privateNote}
                      </p>
                    </div>
                  ) : (
                    <div className="frame-viewport">
                      {!frameLoaded && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#FFFDF8]">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#C2410C] to-[#2F5D50] animate-pulse" />
                          <div className="h-2.5 w-40 rounded-full bg-[#E7DCC3] animate-pulse" />
                          <div className="h-2.5 w-28 rounded-full bg-[#E7DCC3]/70 animate-pulse" />
                        </div>
                      )}
                      <div className="frame-pan">
                        <iframe
                          src={selected.liveUrl}
                          title={`${t.modal.previewOf} ${selected.title}`}
                          loading="lazy"
                          onLoad={() => setFrameLoaded(true)}
                          sandbox="allow-scripts allow-same-origin"
                          className={`site-frame transition-opacity duration-700 ${frameLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold">{selected.title}</h3>
                  <p className="text-sm text-[#57534E] mt-1">{selected.role} · {selected.year}</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg bg-[#E7DCC3] hover:bg-[#CBBFA1] text-[#44403C] transition-all"
                  aria-label={t.modal.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C2410C] mb-2">{t.modal.created}</h4>
                <p className="text-sm text-[#44403C] leading-relaxed">{selected.story}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#C2410C] mb-3">{t.modal.includes}</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#44403C] bg-[#FFFDF8] border border-[#DCD2BE] rounded-xl px-3 py-2.5">
                      <Check className="w-4 h-4 mt-0.5 text-[#047857] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-[#FFFDF8] border border-[#DCD2BE] py-3">
                  <div className="text-xs text-[#57534E]">{t.modal.speed}</div>
                  <div className="font-bold text-[#047857]">{selected.metrics.speed}</div>
                </div>
                <div className="rounded-xl bg-[#FFFDF8] border border-[#DCD2BE] py-3">
                  <div className="text-xs text-[#57534E]">{t.modal.seo}</div>
                  <div className="font-bold text-[#C2410C]">{selected.metrics.SEO}</div>
                </div>
                <div className="rounded-xl bg-[#FFFDF8] border border-[#DCD2BE] py-3">
                  <div className="text-xs text-[#57534E]">{t.modal.conversion}</div>
                  <div className="font-bold text-[#2F5D50]">{selected.metrics.conversion}</div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{t.disclaimers.metrics}</p>
              {!selected.private && (
                <p className="text-[11px] font-semibold text-[#2F5D50] leading-relaxed">{t.modal.auth}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {selected.stack.map((tech, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-[#E7DCC3] text-[#44403C]">
                    {tech}
                  </span>
                ))}
              </div>

              <div className={`grid gap-3 ${selected.private ? '' : 'sm:grid-cols-2'}`}>
                {!selected.private && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-[#E7DCC3] hover:bg-[#CBBFA1] border border-[#C9BCA1] font-semibold text-[#44403C] transition-all flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" /> {t.modal.openLive}
                  </a>
                )}
                <a
                  href="#contacto"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] font-semibold text-white transition-all flex items-center justify-center gap-2"
                >
                  {t.modal.want} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
