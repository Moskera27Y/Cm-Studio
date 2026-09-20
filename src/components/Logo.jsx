import React from 'react';

export default function Logo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 512 512" className={className} role="img" aria-label="CM Dev Studio">
      <title>CM Dev Studio</title>
      <defs>
        <linearGradient id="cm-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="0.55" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="cm-logo-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#cm-logo-bg)" />
      <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#cm-logo-sheen)" />
      <text x="256" y="392" textAnchor="middle" fontFamily="Consolas, 'Courier New', monospace" fontSize="190" fontWeight="bold" fill="#ffffff" opacity="0.14">&lt;/&gt;</text>
      <text x="256" y="330" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="200" fontWeight="900" letterSpacing="-6" fill="#ffffff">CM</text>
    </svg>
  );
}
