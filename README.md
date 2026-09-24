# CM Dev Studio — Portafolio

Portafolio bilingüe (ES/EN) de **CM Dev Studio**, estudio de desarrollo web elite y aplicaciones SaaS. Construido con React + Vite + Tailwind CSS v4, desplegado en Vercel.

## Secciones

- Hero con fondo canvas interactivo
- Quiénes somos + stats
- Metodología (4 pasos)
- Servicios explicados en lenguaje de negocio (SEO, rendimiento, responsive, conversión, seguridad, pagos)
- Proyectos con caso de estudio + vista previa en vivo (Pintando Sueños, AREM WORLD, Papelillo, Matthew Journal — privado)
- Precios transparentes en USD
- Cotizador interactivo → WhatsApp
- FAQ, formulario → WhatsApp (+57 302 747 2998), footer
- Chatbot flotante **CM Assistant** (`POST /api/chat`, OpenAI-compatible; fallback local sin key)

## Desarrollo

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build
```

## Backend del chatbot

`api/chat.js` (serverless Vercel). Requiere en producción:

| Variable      | Valor por defecto              |
|---------------|--------------------------------|
| `AI_API_KEY`  | — (requerida)                  |
| `AI_API_URL`  | `https://openrouter.ai/api/v1` |
| `AI_MODEL`    | Llama gratuito OpenRouter      |

## Deploy

```bash
vercel deploy --prod --yes
```
