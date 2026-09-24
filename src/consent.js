// Consentimiento de cookies y analítica (Ley 1581/2012 + analítica con opt-in).
// Solo se mide con Vercel Analytics si el usuario acepta. Lo funcional
// (idioma, intro) no requiere consentimiento y no se bloquea.
const KEY = 'cm-consent-v1';

export function getConsent() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    if (typeof v?.analytics !== 'boolean') return null;
    return v;
  } catch {
    return null;
  }
}

export function setConsent(analytics) {
  const v = { analytics: !!analytics, date: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch { /* almacenamiento no disponible: se opera sin personalizar */ }
  window.dispatchEvent(new CustomEvent('cm-consent', { detail: v }));
  return v;
}

export function canTrack() {
  return getConsent()?.analytics === true;
}
