// Textos legales ES/EN. Colombia: Ley 1581/2012 (habeas data), Decreto 1377/2013,
// Ley 1480/2011 (consumidor), Ley 527/1999 (comercio electrónico). SIC como autoridad.
// Negocio: CM Dev Studio (Cristian Mosquera), Colombia, trabajo remoto global,
// contacto oficial por WhatsApp +57 302 747 2998. Precios en USD + impuestos aplicables.
export const UPDATED = { es: 'Última actualización: septiembre de 2026', en: 'Last updated: September 2026' };

export const LEGAL = {
  es: {
    business: {
      name: 'CM Dev Studio (Cristian Mosquera)',
      location: 'Colombia · trabajo remoto global',
      contact: 'WhatsApp +57 302 747 2998 (canal oficial)',
      tax: 'Persona natural; los datos fiscales se detallan en la factura/cuenta de cobro.',
    },
    privacy: {
      title: 'Política de Privacidad',
      body: [
        'Responsable: CM Dev Studio (Cristian Mosquera), Colombia. Canal oficial: WhatsApp +57 302 747 2998. Esta web es un portafolio y cotizador; no crea cuentas ni vende en línea aquí.',
        'Datos que recolectamos (solo los necesarios): (a) formulario de contacto que TÚ envías por WhatsApp: nombre, correo, tipo de proyecto, presupuesto y detalles que escribas; (b) cotizador: tipo de proyecto y extras (sin datos personales, se guarda solo el estimado en nuestra base para seguimiento); (c) chat CM Assistant: los mensajes que escribas (máx. 500 caracteres por mensaje, últimos 8 para contexto). No pedimos contraseñas, documentos ni datos sensibles: no los envíes.',
        'Finalidades: responder y agendar por WhatsApp, preparar tu cotización, mejorar la web y atender garantías. Base jurídica: tu consentimiento libre e informado (casilla obligatoria antes de enviar).',
        'Encargados y transferencias: WhatsApp/Meta (cuando eliges enviar por WhatsApp, tus datos viajan a Meta según sus políticas); Vercel (hosting y analítica, solo si aceptas cookies); Neon/Postgres (estimados del cotizador); OpenRouter/IA (mensajes del chat para generar la respuesta). No vendemos tus datos.',
        'Tus derechos (Ley 1581/2012): conocer, actualizar, rectificar, suprimir y revocar tu autorización. Escríbenos por WhatsApp desde el número/correo que usaste y respondemos en máximo 15 días hábiles. Reclamos ante la SIC (www.sic.gov.co).',
        'Conservación: leads y mensajes el tiempo necesario para la relación comercial y luego se eliminan o anonimizan (máx. 2 años salvo obligación legal). Seguridad: HTTPS, mínimos accesos y rate-limit en el chat.',
        'Menores: esta web es para contratar servicios profesionales. Si eres menor, usa la web con un adulto responsable.',
      ],
    },
    terms: {
      title: 'Términos y Condiciones',
      body: [
        'Servicios: diseño y desarrollo web a medida (landing, corporativo, e-commerce, SaaS/web app). Todo es estimado y se confirma por escrito (WhatsApp) antes de iniciar: alcance, precio final en USD, plazos y entregables.',
        'Precios y pagos: los valores publicados son rangos base en USD y NO incluyen impuestos, dominio ni pasarelas de terceros salvo que se indique. Forma habitual: 50% de anticipo para iniciar y 50% contra entrega. Medios: transferencia, Stripe, PayPal y Wompi. Sin anticipo no se agenda ni se inicia.',
        'Plazos estimados (no garantizados, dependen de tu feedback): landing 1–2 semanas, corporativo 2–4, e-commerce 4–6, SaaS por fases. Incluye 2 rondas de ajustes de diseño/textos; cambios de alcance se cotizan aparte.',
        'Propiedad: al pagar el 100%, te transferimos código, dominio (a tu nombre) y accesos. Podemos mostrar el proyecto en el portafolio salvo pacto escrito en contra. Textos base e imágenes de banco deben ser reemplazados por tu contenido final; tú garantizas tener derechos sobre el material que nos entregas.',
        'Garantía: 30 días tras el lanzamiento para corregir errores de lo entregado (no incluye cambios, contenido nuevo, hacks por mala gestión de claves ni servicios de terceros). Soporte y mantenimiento se cotizan aparte.',
        'Limitación: no garantizamos posiciones en Google, ventas ni velocidad exacta en todos los dispositivos; las métricas publicadas son resultados pasados o demostraciones ilustrativas. Nuestra responsabilidad se limita al valor pagado del proyecto.',
        'Ley aplicable: Colombia. Primero trato directo por WhatsApp; si persiste, jueces de Colombia. Consumidor: Ley 1480/2011 y SIC.',
      ],
    },
    cookies: {
      title: 'Política de Cookies',
      body: [
        '¿Necesitas dar consentimiento? Sí para lo no esencial. Las técnicas/estrictamente necesarias funcionan sin permiso; la analítica y contenidos de terceros solo con tu aceptación (banner + botón “Cookies”). Puedes cambiar o revocar cuando quieras.',
        'Lo que usamos: (1) cm-lang (localStorage, 1 año, funcional: recuerda idioma); (2) cm-intro (sessionStorage, funcional: muestra la intro una vez); (3) cm-consent-v1 (localStorage, 1 año, recuerda tu elección de cookies); (4) Analítica Vercel (solo si aceptas: visitas y eventos agregados como contact_submit o quote_generated, sin perfilarte); (5) Terceros si los usas: WhatsApp/Meta al abrir wa.me, y los sitios de demostración dentro de los modales (iframes de pintandosueños.com, arem-mu.vercel.app, papelillo…) que aplican sus propias cookies.',
        'Sin aceptación no medimos ni cargamos analítica. Los iframes de proyectos solo cargan cuando abres el caso de estudio. Los enlaces a WhatsApp salen a Meta bajo sus políticas.',
        'Gestión: botón “Cookies” en el pie para re-elegir, más el borrado de tu navegador (cookies + almacenamiento). Bloquear lo funcional puede afectar idioma/intro.',
      ],
    },
    refunds: {
      title: 'Política de Reembolsos',
      body: [
        'Anticipo del 50%: reserva tu cupo y cubre descubrimiento + primeros entregables; no es reembolsable una vez iniciado el trabajo, salvo incumplimiento nuestro.',
        'Si cancelas antes de iniciar, devolvemos el 100% del anticipo en 15 días hábiles por el mismo medio (menos comisiones de la pasarela). Si cancelas con trabajo avanzado, pagas lo ejecutado a precio proporcional y te entregamos archivos/diseños hasta esa fase.',
        'Garantía de 30 días = corrección de errores, no devolución. Si un error nuestro impide usar lo entregado y no lo corregimos en 15 días hábiles, devolvemos la parte proporcional afectada.',
        'Para pedirlo: WhatsApp +57 302 747 2998 con tu nombre, fecha de pago y motivo. Respondemos en 5 días hábiles. Cambios de idea, demoras en entregar tu contenido o servicios de terceros (dominio, hosting, Wompi/Stripe) no generan reembolso nuestro, pero te ayudamos a gestionarlos.',
      ],
    },
  },
  en: {
    business: {
      name: 'CM Dev Studio (Cristian Mosquera)',
      location: 'Colombia · remote worldwide',
      contact: 'WhatsApp +57 302 747 2998 (official channel)',
      tax: 'Sole proprietor; tax details appear on the invoice.',
    },
    privacy: {
      title: 'Privacy Policy',
      body: [
        'Controller: CM Dev Studio (Cristian Mosquera), Colombia. Official channel: WhatsApp +57 302 747 2998. This site is a portfolio and estimator; it creates no accounts and sells nothing here.',
        'Data we collect (minimum only): (a) contact form YOU send via WhatsApp: name, email, project type, budget and details you type; (b) estimator: project type and extras (no personal data; only the estimate is stored for follow-up); (c) CM Assistant chat: messages you type (max 500 chars each, last 8 for context). We never ask for passwords, IDs or sensitive data — please do not send them.',
        'Purposes: reply and schedule via WhatsApp, prepare your quote, improve the site and handle warranty. Legal basis: your free, informed consent (mandatory checkbox before sending).',
        'Processors/transfers: WhatsApp/Meta (when you choose WhatsApp, your data goes to Meta under its policies); Vercel (hosting and analytics, only with cookie consent); Neon/Postgres (estimator figures); OpenRouter/AI (chat messages to generate the answer). We do not sell your data.',
        'Your rights (Law 1581/2012): access, update, correct, delete and revoke consent. Message us on WhatsApp from the number/email you used; we reply within 15 business days. Complaints: SIC (www.sic.gov.co).',
        'Retention: leads and messages only as long as needed, then deleted or anonymized (max 2 years unless legally required). Security: HTTPS, least-privilege access and chat rate-limiting.',
        'Minors: this site is for hiring professional services. Minors should use it with a responsible adult.',
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      body: [
        'Services: custom web design and development (landing, corporate, e-commerce, SaaS/web app). Everything is an estimate confirmed in writing (WhatsApp) before start: scope, final USD price, timeline and deliverables.',
        'Pricing and payment: published values are base USD ranges EXCLUDING taxes, domains and third-party fees unless stated. Usual form: 50% deposit to start, 50% on delivery. Methods: bank transfer, Stripe, PayPal, Wompi. No deposit, no booking or start.',
        'Estimated timelines (not guaranteed, depend on your feedback): landing 1–2 weeks, corporate 2–4, e-commerce 4–6, SaaS in phases. Includes 2 design/copy revision rounds; scope changes are quoted separately.',
        'Ownership: after 100% payment we transfer code, domain (in your name) and access. We may show the project in the portfolio unless agreed otherwise in writing. Base copy and stock images must be replaced by your final content; you warrant rights over materials you provide.',
        'Warranty: 30 days after launch to fix defects in the deliverable (excludes changes, new content, hacks from poor key handling or third-party services). Support/maintenance quoted separately.',
        'Limitation: we do not guarantee Google rankings, sales or exact speed on every device; published metrics are past results or illustrative demos. Liability is capped at the amount paid for the project.',
        'Governing law: Colombia. Direct resolution via WhatsApp first; then Colombian courts. Consumers: Law 1480/2011 and SIC.',
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      body: [
        'Do you need to consent? Yes for non-essential items. Strictly-necessary storage works without permission; analytics and third-party content only load after you accept (banner + “Cookies” button). You can change or revoke anytime.',
        'What we use: (1) cm-lang (localStorage, 1 year, functional: remembers language); (2) cm-intro (sessionStorage, functional: shows intro once); (3) cm-consent-v1 (localStorage, 1 year, remembers your cookie choice); (4) Vercel Analytics (only if accepted: aggregate visits/events such as contact_submit or quote_generated, no profiling); (5) Third parties if you use them: WhatsApp/Meta when opening wa.me, and demo sites inside case-study modals (iframes) with their own cookies.',
        'Without acceptance we do not measure or load analytics. Project iframes only load when you open the case study. WhatsApp links leave to Meta under its policies.',
        'Control: “Cookies” button in the footer to re-choose, plus your browser clear-site-data. Blocking functional storage may affect language/intro.',
      ],
    },
    refunds: {
      title: 'Refund Policy',
      body: [
        '50% deposit: books your slot and covers discovery + first deliverables; non-refundable once work starts, except for our non-performance.',
        'Cancel before start: 100% of the deposit back within 15 business days via the same method (minus gateway fees). Cancel mid-project: you pay proportionally for work done and receive files/designs up to that stage.',
        '30-day warranty = bug fixes, not refunds. If our defect blocks use of the deliverable and we do not fix it within 15 business days, we refund the affected proportional part.',
        'To request: WhatsApp +57 302 747 2998 with your name, payment date and reason. We reply within 5 business days. Change of mind, delays delivering your content, or third-party services (domain, hosting, Wompi/Stripe) do not trigger a refund from us, but we help you handle them.',
      ],
    },
  },
};
