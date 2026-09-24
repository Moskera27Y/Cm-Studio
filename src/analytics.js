// Wrapper de analítica con consentimiento previo. Si no hay opt-in,
// los eventos se descartan en silencio (no se cargan ni se envían).
import { track as vercelTrack } from '@vercel/analytics';
import { canTrack } from './consent';

export function safeTrack(event, props) {
  try {
    if (!canTrack()) return;
    vercelTrack(event, props);
  } catch { /* analítica nunca debe romper la web */ }
}
