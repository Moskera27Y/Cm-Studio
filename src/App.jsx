import React, { useState, useEffect } from 'react';
import {
  Code2, Sparkles, Rocket, CheckCircle2, ArrowRight,
  ShieldCheck, Zap, Globe, Check, MessageSquare, X,
  Smartphone, Target, CreditCard, Menu, ChevronDown, Star, Calculator, MonitorSmartphone
} from 'lucide-react';
import AnimatedBackground from './components/AnimatedBackground';
import Logo from './components/Logo';
import CMAssistant from './components/CMAssistant';
import { STRINGS } from './i18n';

const ICONS = {
  globe: Globe,
  zap: Zap,
  smartphone: Smartphone,
  target: Target,
  shield: ShieldCheck,
  card: CreditCard,
  soon: Rocket,
};

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

const GICONS = [CheckCircle2, ShieldCheck, Code2, MessageSquare];

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

// Tilt 3D sutil (solo puntero fino)
const tiltMove = (e) => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const r = e.currentTarget.getBoundingClientRect();
  const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
  const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
  e.currentTarget.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
};
const tiltLeave = (e) => { e.currentTarget.style.transform = ''; };

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
  const respW = resp === 'mobile' ? '180px' : resp === 'tablet' ? '340px' : '100%';
  const respLabel = resp === 'mobile' ? t.responsive.mobile : resp === 'tablet' ? t.responsive.tablet : t.responsive.desktop;
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 01 · Velocidad */}
      <div ref={raceRef} className="p-8 md:p-10 rounded-3xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-start gap-5">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-blue-400">01</p>
            <h3 className="text-2xl font-bold mt-1">{t.speed.title}</h3>
            <p className="text-slate-400 mt-2 max-w-2xl leading-relaxed">{t.speed.desc}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 mt-8">
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">{t.speed.avg}</span><span className="font-bold text-rose-400">{t.speed.slowTime}</span></div>
            <div className="h-4 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 transition-all duration-[1400ms] ease-out" style={{ width: race ? '92%' : '4%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">{t.speed.ours}</span><span className="font-bold text-emerald-400">{t.speed.fastTime}</span></div>
            <div className="h-4 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-[400ms] ease-out" style={{ width: race ? '9%' : '4%' }} />
            </div>
          </div>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"><CheckCircle2 className="w-4 h-4" />{t.speed.verdict}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 02 · Responsive */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-900/40">
              <MonitorSmartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-cyan-400">02</p>
              <h3 className="text-xl font-bold mt-1">{t.responsive.title}</h3>
              <p className="text-slate-400 mt-1.5 text-sm leading-relaxed">{t.responsive.desc}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {['mobile', 'tablet', 'desktop'].map((k) => (
              <button
                key={k}
                onClick={() => setResp(k)}
                aria-pressed={resp === k}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${resp === k ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800/80 text-slate-400 hover:text-white'}`}
              >
                {t.responsive[k]}
              </button>
            ))}
          </div>
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-800/80">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="ml-2 text-[11px] text-slate-500">tu-sitio.com · {respLabel}</span>
            </div>
            <div className="h-[210px] flex items-start justify-center p-4 overflow-hidden">
              <div className="transition-all duration-500 rounded-lg bg-slate-900 border border-slate-700 p-3 space-y-2 overflow-hidden" style={{ width: respW, maxWidth: '100%' }}>
                <div className="h-2 w-2/3 rounded bg-blue-500/70" />
                <div className="h-2 w-full rounded bg-slate-700" />
                <div className="h-2 w-5/6 rounded bg-slate-700" />
                <div className="flex gap-1.5 pt-1">
                  <div className="h-5 flex-1 rounded-md bg-blue-600" />
                  <div className="h-5 flex-1 rounded-md bg-slate-700" />
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{t.responsive.note}</p>
        </div>
        {/* 03 · Movimiento */}
        <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-purple-400">03</p>
              <h3 className="text-xl font-bold mt-1">{t.ease.title}</h3>
              <p className="text-slate-400 mt-1.5 text-sm leading-relaxed">{t.ease.desc}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {t.ease.styles.map((c, i) => (
              <button
                key={c}
                onClick={() => { setMotion(i); setRun((r) => r + 1); }}
                aria-pressed={motion === i}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${motion === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800/80 text-slate-400 hover:text-white'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5"><span>{t.ease.duration}</span><span className="font-bold">{dur}ms</span></div>
            <input
              type="range" min="300" max="2000" step="100" value={dur}
              onChange={(e) => setDur(Number(e.target.value))}
              aria-label={t.ease.duration}
              className="w-full accent-blue-600"
            />
          </div>
          <div className="h-[64px] rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden">
            <div
              key={run}
              className="lab-ball absolute top-1/2 -translate-y-1/2 left-3 w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-500"
              style={{ animation: `labSlide ${dur}ms ${EASINGS[motion]} forwards` }}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-500 leading-relaxed">{t.ease.note}</p>
            <button onClick={() => setRun((r) => r + 1)} className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
              {t.ease.play}
            </button>
          </div>
        </div>
      </div>

      {/* Franja: todo incluido */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
        <span className="text-sm font-bold text-emerald-300">{t.included.title}</span>
        {t.included.items.map((it) => (
          <span key={it} className="inline-flex items-center gap-2 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-400" />{it}</span>
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

  // Estado del Formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: t.contact.types[0],
    budget: '$300 - $600 USD',
    details: ''
  });

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
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
    doc.text('CM STUDIO', 15, 17);
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
    doc.text('CM Studio · https://wa.me/573027472998', 15, y);
    try {
      doc.save('cotizacion-cm-studio.pdf');
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <a href="#contacto" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white">
        {t.nav.cta}
      </a>
      {/* Fondo animado */}
      <AnimatedBackground />

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#07090e]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10 drop-shadow-lg" />
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              CM Studio
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium" aria-label="Principal">
            <a href="#filosofia" className="hover:text-blue-400 transition-colors">{t.nav.about}</a>
            <a href="#metodo" className="hover:text-blue-400 transition-colors">{t.nav.method}</a>
            <a href="#servicios" className="hover:text-blue-400 transition-colors">{t.nav.services}</a>
            <a href="#proyectos" className="hover:text-blue-400 transition-colors">{t.nav.projects}</a>
            <a href="#precios" className="hover:text-blue-400 transition-colors">{t.nav.pricing}</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">{t.nav.faq}</a>
            <a href="#contacto" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-600/30">
              {t.nav.cta}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Selector de idioma */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold">
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-2.5 py-1 rounded-full uppercase transition-all ${
                    lang === l ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            {/* Hamburguesa móvil */}
            <button
              className="md:hidden p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.modal.close : 'Menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {/* Panel móvil */}
        {menuOpen && (
          <nav className="md:hidden border-t border-slate-800 bg-[#07090e]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-1 text-sm font-medium" aria-label="Móvil">
            {[
              ['#filosofia', t.nav.about], ['#metodo', t.nav.method], ['#servicios', t.nav.services],
              ['#proyectos', t.nav.projects], ['#precios', t.nav.pricing], ['#faq', t.nav.faq],
            ].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2.5 px-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white transition-colors">
                {label}
              </a>
            ))}
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center transition-all">
              {t.nav.cta}
            </a>
          </nav>
        )}
      </header>
      {/* Barra de progreso de scroll */}
      <div
        aria-hidden="true"
        className="fixed top-20 left-0 h-[2px] z-40 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500"
        style={{ width: `${scrollPct}%` }}
      />

      {/* Main Content */}
      <main className="relative pt-32 pb-20 max-w-7xl mx-auto px-6 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="hero-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium" style={{ animationDelay: '0ms' }}>
            <Sparkles className="w-4 h-4" /> {t.hero.badge}
          </div>
          <h1 className="hero-in text-5xl md:text-7xl font-extrabold tracking-tight leading-tight" style={{ animationDelay: '120ms' }}>
            {t.hero.titleA} <span className="gradient-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">{t.hero.titleB}</span>
          </h1>
          <Typewriter
            key={lang}
            text={t.hero.sub}
            className="hero-in text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto min-h-[84px] md:min-h-[72px]"
          />
          <div className="hero-in flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" style={{ animationDelay: '360ms' }}>
            <a href="#contacto" className="btn-shine w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2">
              {t.hero.cta1} <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#proyectos" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-300 transition-all flex items-center justify-center gap-2">
              {t.hero.cta2}
            </a>
          </div>
        </section>

        {/* Marquee de stack */}
        <div className="overflow-hidden" aria-hidden="true">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 mb-5">{t.marquee.label}</p>
          <div className="marquee">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-group">
                  {STACK.map((s) => (
                    <React.Fragment key={`${copy}-${s}`}>
                      <span className="text-sm font-semibold uppercase tracking-widest text-slate-500 whitespace-nowrap">{s}</span>
                      <span className="text-blue-500 text-xs" aria-hidden="true">•</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiénes somos + stats */}
        <section id="filosofia" className="space-y-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.about.title}</h2>
            <p className="text-slate-400 leading-relaxed">{t.about.text}</p>
          </div>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {t.about.stats.map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center hover:border-blue-500/50 transition-all">
                <dt className="order-2 text-xs text-slate-500 mt-1">{s.label}</dt>
                <dd className="order-1 text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"><Stat key={`${lang}-${s.label}`} value={s.value} /></dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Metodología */}
        <section id="metodo" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.method.title}</h2>
            <p className="text-slate-400">{t.method.sub}</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {t.method.steps.map((m, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all">
                <span className="text-3xl font-black text-blue-500/40">{m.num}</span>
                <h3 className="text-xl font-bold mt-2 mb-2">{m.title}</h3>
                <p className="text-sm text-slate-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Servicios / Conceptos explicados */}
        <section id="servicios" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.services.title}</h2>
            <p className="text-slate-400">{t.services.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.items.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <div key={i} onMouseMove={spotMove} className="spot group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-blue-600/15 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">{s.term}</span>
                  </div>
                  <h3 className="text-lg font-bold mt-4 mb-1.5">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Laboratorio */}
        <section id="lab" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-300">{t.lab.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold">{t.lab.title}</h2>
            <p className="text-slate-400 leading-relaxed">{t.lab.sub}</p>
          </div>
          <LabSection t={t.lab} />
        </section>

        {/* Proyectos Showcase */}
        <section id="proyectos" className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">{t.projects.title}</h2>
              <p className="text-slate-400 text-sm">{t.projects.sub}</p>
            </div>
            <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
              {['all', 'ngo', 'ecommerce', 'saas'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
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
                className="spot card-in p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-blue-500/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/10 transition-all cursor-pointer"
              >
                <div className="space-y-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                    {p.tag}
                  </span>
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="text-sm text-slate-400">{p.desc}</p>

                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/80 text-center">
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.speed}</div>
                      <div className="text-sm font-bold text-emerald-400">{p.metrics.speed}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.seo}</div>
                      <div className="text-sm font-bold text-blue-400">{p.metrics.SEO}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">{t.modal.conversion}</div>
                      <div className="text-sm font-bold text-purple-400">{p.metrics.conversion}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400">
                    {t.projects.viewCase} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.pricing.title}</h2>
            <p className="text-slate-400">{t.pricing.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.pricing.plans.map((plan, i) => (
              <div
                key={i}
                onMouseMove={(e) => { spotMove(e); tiltMove(e); }}
                onMouseLeave={tiltLeave}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`spot tilt card-in relative p-6 rounded-2xl border flex flex-col transition-all hover:shadow-2xl hover:shadow-blue-600/10 ${i === 2 ? 'bg-gradient-to-b from-blue-600/15 to-purple-600/10 border-blue-500/60 shadow-xl shadow-blue-600/10' : 'bg-slate-900/50 border-slate-800 hover:border-blue-500/50'}`}>
                {i === 2 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold px-3 py-1 rounded-full bg-blue-600 text-white whitespace-nowrap">
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="text-2xl font-black mt-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{plan.price} <span className="text-xs font-normal text-slate-500">USD</span></div>
                <p className="text-sm text-slate-400 mt-2">{plan.desc}</p>
                <ul className="mt-4 space-y-2 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/573027472998?text=${encodeURIComponent(`${t.quote.waGreet} ${plan.name} (${plan.price} USD)`)}`}
                  target="_blank" rel="noreferrer"
                  className="mt-6 w-full py-3 rounded-xl bg-slate-800 hover:bg-blue-600 border border-slate-700 font-semibold text-sm text-center transition-all"
                >
                  {t.pricing.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Cotizador interactivo */}
        <section id="cotizador" className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
              <Calculator className="w-4 h-4" /> {t.quote.title}
            </div>
            <p className="text-slate-400 text-sm">{t.quote.sub}</p>
          </div>
          <div>
            <label htmlFor="qtype" className="text-xs font-semibold text-slate-300">{t.quote.type}</label>
            <select
              id="qtype"
              value={qType}
              onChange={(e) => setQType(Number(e.target.value))}
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
            >
              {t.contact.types.map((type, i) => (
                <option key={type} value={i}>{type} — ${QUOTE_BASE[i].toLocaleString('en-US')} USD</option>
              ))}
            </select>
          </div>
          <fieldset>
            <legend className="text-xs font-semibold text-slate-300">{t.quote.extras}</legend>
            <div className="grid sm:grid-cols-2 gap-2 mt-1.5">
              {t.quote.extrasList.map((ex, i) => (
                <label key={i} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl border text-sm cursor-pointer transition-all ${qExtras.includes(i) ? 'bg-blue-600/15 border-blue-500/60' : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'}`}>
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={qExtras.includes(i)}
                      onChange={() => setQExtras((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])}
                      className="accent-blue-600 w-4 h-4"
                    />
                    {ex.label}
                  </span>
                  <span className="text-slate-400 font-semibold">+${ex.price}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <div className="text-center sm:text-left">
              <div className="text-xs text-slate-500">{t.quote.estimated} (USD)</div>
              <div className="text-3xl font-black text-emerald-400">${quoteTotal.toLocaleString('en-US')} – ${Math.round(quoteTotal * 1.3).toLocaleString('en-US')}</div>
              <div className="text-[11px] text-slate-500">{t.quote.rangeNote}</div>
            </div>
            <button
              onClick={handleQuotePDF}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-5 h-5" /> {t.quote.cta}
            </button>
          </div>
          <p className="text-[11px] text-slate-500 text-center">{t.quote.pdfNote}</p>
        </section>

        {/* Garantías */}
        <section id="garantias" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.guarantees.title}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.guarantees.items.map((g, i) => {
              const Icon = GICONS[i % GICONS.length];
              return (
                <div key={i} onMouseMove={spotMove} className="spot p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all">
                  <span className="p-2.5 rounded-xl bg-emerald-600/15 text-emerald-400 inline-block">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-bold mt-4 mb-1.5">{g.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{g.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comparativa */}
        <section id="comparativa" className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.compare.title}</h2>
            <p className="text-slate-400">{t.compare.sub}</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-sm min-w-[600px] bg-slate-900/50">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4 font-semibold text-slate-400" />
                  {t.compare.cols.map((c, i) => (
                    <th key={c} className={`p-4 text-center font-bold ${i === 0 ? 'text-blue-400 bg-blue-600/10' : 'text-slate-300'}`}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.compare.rows.map((r, i) => (
                  <tr key={i} className="border-b border-slate-800/60 last:border-0">
                    <td className="p-4 font-semibold text-slate-200">{r.f}</td>
                    {r.v.map((cell, j) => (
                      <td key={j} className={`p-4 text-center ${j === 0 ? 'bg-blue-600/10 font-semibold text-slate-100' : 'text-slate-400'}`}>
                        {cell === 'yes'
                          ? <Check className="w-5 h-5 text-emerald-400 mx-auto" />
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
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t.faq.title}</h2>
            <p className="text-slate-400">{t.faq.sub}</p>
          </div>
          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <div key={i} className={`rounded-2xl border transition-all ${openFaq === i ? 'bg-slate-900 border-blue-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
                >
                  {item.q}
                  <ChevronDown className={`w-5 h-5 shrink-0 text-blue-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Formulario de Contacto Directo */}
        <section id="contacto" className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">{t.contact.title}</h2>
            <p className="text-slate-400 text-sm">{t.contact.sub}</p>
          </div>

          <form onSubmit={handleWhatsAppSend} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="f-name" className="text-xs font-semibold text-slate-300">{t.contact.name}</label>
                <input
                  id="f-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={t.contact.namePh}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="f-email" className="text-xs font-semibold text-slate-300">{t.contact.email}</label>
                <input
                  id="f-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="correo@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="f-type" className="text-xs font-semibold text-slate-300">{t.contact.type}</label>
                <select
                  id="f-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
                >
                  {t.contact.types.map((type, i) => (
                    <option key={type} value={type}>{t.contact.typeLabels[i]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-budget" className="text-xs font-semibold text-slate-300">{t.contact.budget}</label>
                <select
                  id="f-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
                >
                  <option value="$300 - $600 USD">$300 - $600 USD</option>
                  <option value="$600 - $1,200 USD">$600 - $1,200 USD</option>
                  <option value="$1,200 - $2,500 USD">$1,200 - $2,500 USD</option>
                  <option value="$2,500+ USD">$2,500+ USD</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="f-details" className="text-xs font-semibold text-slate-300">{t.contact.details}</label>
              <textarea
                id="f-details"
                rows="3"
                placeholder={t.contact.detailsPh}
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" /> {t.contact.submit}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/80 bg-[#05070b]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="w-9 h-9" />
              <span className="font-bold text-lg tracking-tight">CM Studio</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{t.footer.tag}</p>
          </div>
          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{t.footer.links}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {[
                ['#filosofia', t.nav.about], ['#metodo', t.nav.method], ['#servicios', t.nav.services],
                ['#proyectos', t.nav.projects], ['#precios', t.nav.pricing], ['#faq', t.nav.faq], ['#contacto', t.nav.cta],
              ].map(([href, label]) => (
                <li key={href}><a href={href} className="inline-block py-1.5 hover:text-blue-400 transition-colors">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="https://wa.me/573027472998" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <MessageSquare className="w-4 h-4" /> +57 302 747 2998
                </a>
              </li>
              <li className="flex items-center gap-2"><Globe className="w-4 h-4" /> {t.footer.location}</li>
            </ul>
            <a href="#contacto" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all">
              {t.nav.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>© {new Date().getFullYear()} CM Studio. {t.footer.rights}</span>
            <span className="inline-flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-amber-400" /> React · Tailwind · Vercel</span>
          </div>
        </div>
      </footer>

      {/* Asistente virtual */}
      <CMAssistant key={lang} lang={lang} />

      {/* Modal Caso de Estudio */}
      {selected && (
        <div
          className="modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            role="dialog" aria-modal="true" aria-label={selected.title}
            className="modal-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Vista previa del sitio */}
            <div className={`p-6 pb-0 bg-gradient-to-br ${selected.color}`}>
              <div className="rounded-t-2xl overflow-hidden border border-slate-700/60 border-b-0">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  {selected.private ? (
                    <span className="ml-3 flex-1 text-xs text-slate-400 bg-slate-800 rounded-lg px-3 py-1.5 truncate">
                      {selected.url}
                    </span>
                  ) : (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="ml-3 flex-1 text-xs text-slate-400 bg-slate-800 hover:bg-slate-700 hover:text-slate-200 rounded-lg px-3 py-1.5 truncate transition-colors"
                    >
                      {selected.url}
                    </a>
                  )}
                </div>
                <div className="bg-slate-950 px-3 md:px-5 pt-4">
                  {selected.noFrame ? (
                    <div className="flex flex-col items-center justify-center gap-3 h-[380px] rounded-t-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 border-b-0 text-center px-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-rose-500/20">
                        {selected.monogram}
                      </div>
                      <div className="text-lg font-bold">{selected.title}</div>
                      <p className="text-sm text-slate-400 max-w-xs">
                        {t.modal.privateNote}
                      </p>
                    </div>
                  ) : (
                    <div className="frame-viewport">
                      {!frameLoaded && (
                        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-slate-950">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 animate-pulse" />
                          <div className="h-2.5 w-40 rounded-full bg-slate-800 animate-pulse" />
                          <div className="h-2.5 w-28 rounded-full bg-slate-800/70 animate-pulse" />
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
                  <p className="text-sm text-slate-400 mt-1">{selected.role} · {selected.year}</p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  aria-label={t.modal.close}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-2">{t.modal.created}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{selected.story}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">{t.modal.includes}</h4>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {selected.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 py-3">
                  <div className="text-xs text-slate-500">{t.modal.speed}</div>
                  <div className="font-bold text-emerald-400">{selected.metrics.speed}</div>
                </div>
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 py-3">
                  <div className="text-xs text-slate-500">{t.modal.seo}</div>
                  <div className="font-bold text-blue-400">{selected.metrics.SEO}</div>
                </div>
                <div className="rounded-xl bg-slate-900/60 border border-slate-800 py-3">
                  <div className="text-xs text-slate-500">{t.modal.conversion}</div>
                  <div className="font-bold text-purple-400">{selected.metrics.conversion}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selected.stack.map((tech, idx) => (
                  <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-300">
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
                    className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 font-semibold text-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" /> {t.modal.openLive}
                  </a>
                )}
                <a
                  href="#contacto"
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white transition-all flex items-center justify-center gap-2"
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
