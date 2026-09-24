import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import { getConsent } from './consent'

function Root() {
  const [allowed, setAllowed] = useState(() => getConsent()?.analytics === true);
  useEffect(() => {
    const sync = () => setAllowed(getConsent()?.analytics === true);
    window.addEventListener('cm-consent', sync);
    return () => window.removeEventListener('cm-consent', sync);
  }, []);
  return (
    <StrictMode>
      <App />
      {allowed && <Analytics />}
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Root />)
