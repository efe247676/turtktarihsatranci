/**
 * Kazanan ve kaybeden için özel SVG görselleri.
 * Sadece "Osmanlı vs Safeviler" savaşında aktif olur (easter egg).
 */

export function LokumSVG({ size = 200 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Lokum gövdesi için parlak pembe-şeftali gradient */}
        <radialGradient id="lokumBody" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffe4ec" />
          <stop offset="40%" stopColor="#ff9ec0" />
          <stop offset="100%" stopColor="#d63571" />
        </radialGradient>
        {/* Üstteki şeker pudrağı */}
        <linearGradient id="lokumTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffe4ec" stopOpacity="0.7" />
        </linearGradient>
        {/* Parıltı */}
        <radialGradient id="sparkle" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#fff8b0" stopOpacity="1" />
          <stop offset="100%" stopColor="#fff8b0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gölge */}
      <ellipse cx="100" cy="180" rx="70" ry="8" fill="#000" opacity="0.25" />

      {/* Lokum gövdesi — küp şeklinde yuvarlatılmış */}
      <g>
        {/* Ön yüz */}
        <rect
          x="35"
          y="55"
          width="130"
          height="110"
          rx="22"
          ry="22"
          fill="url(#lokumBody)"
          stroke="#8b1d4a"
          strokeWidth="2.5"
        />
        {/* Üst yüz (perspektif için) */}
        <path
          d="M 35 77 Q 100 50 165 77 L 165 55 Q 100 28 35 55 Z"
          fill="url(#lokumTop)"
          stroke="#8b1d4a"
          strokeWidth="2.5"
        />
        {/* Sağ yan */}
        <path
          d="M 165 55 L 165 165 Q 165 187 143 187 L 165 165 Z"
          fill="#a02358"
          stroke="#8b1d4a"
          strokeWidth="2"
          opacity="0.6"
        />
      </g>

      {/* Pudra şekeri serpintisi */}
      {[
        [55, 60], [75, 50], [95, 45], [115, 50], [135, 60], [150, 75],
        [50, 90], [80, 85], [105, 90], [130, 88], [155, 100],
        [55, 115], [85, 120], [115, 118], [145, 122],
        [50, 140], [80, 145], [110, 148], [140, 145], [150, 135],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#ffffff" opacity="0.9" />
      ))}

      {/* Mutlu yüz */}
      <g>
        {/* Gözler (kısılma — mutlu) */}
        <path
          d="M 70 105 Q 78 95 86 105"
          stroke="#3a0a1f"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 114 105 Q 122 95 130 105"
          stroke="#3a0a1f"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Yanaklar (pembe allık) */}
        <ellipse cx="62" cy="125" rx="9" ry="5" fill="#ff5a8a" opacity="0.5" />
        <ellipse cx="138" cy="125" rx="9" ry="5" fill="#ff5a8a" opacity="0.5" />
        {/* Gülümseme */}
        <path
          d="M 78 132 Q 100 152 122 132"
          stroke="#3a0a1f"
          strokeWidth="3.5"
          fill="#ff4d7a"
          strokeLinecap="round"
        />
        {/* Dil ucu */}
        <ellipse cx="100" cy="142" rx="6" ry="4" fill="#ff7aa0" />
      </g>

      {/* Parıltı yıldızları */}
      <g opacity="0.9">
        <circle cx="40" cy="40" r="6" fill="url(#sparkle)" />
        <circle cx="170" cy="35" r="5" fill="url(#sparkle)" />
        <circle cx="180" cy="110" r="4" fill="url(#sparkle)" />
        <circle cx="25" cy="125" r="5" fill="url(#sparkle)" />
        <circle cx="160" cy="170" r="3" fill="url(#sparkle)" />
        <circle cx="45" cy="170" r="4" fill="url(#sparkle)" />
      </g>

      {/* Tacı */}
      <g>
        <path
          d="M 60 45 L 65 25 L 75 38 L 85 22 L 95 36 L 105 20 L 115 36 L 125 22 L 135 38 L 145 25 L 150 45 Z"
          fill="#fde047"
          stroke="#a16207"
          strokeWidth="2"
        />
        {/* Taşlar */}
        <circle cx="75" cy="32" r="2.5" fill="#ef4444" />
        <circle cx="95" cy="30" r="3" fill="#3b82f6" />
        <circle cx="115" cy="30" r="2.5" fill="#10b981" />
        <circle cx="135" cy="32" r="2.5" fill="#a855f7" />
      </g>
    </svg>
  );
}

export function BokSVG({ size = 200 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        {/* Bok gövdesi — kirli kahverengi-yeşil gradient */}
        <radialGradient id="bokBody" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#8b6b3a" />
          <stop offset="60%" stopColor="#5c4a26" />
          <stop offset="100%" stopColor="#2f2510" />
        </radialGradient>
        {/* Parlak ıslak nokta */}
        <radialGradient id="wetShine" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#a08552" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#a08552" stopOpacity="0" />
        </radialGradient>
        {/* Sineklık */}
        <radialGradient id="flyBuzz" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gölge */}
      <ellipse cx="100" cy="180" rx="80" ry="10" fill="#000" opacity="0.4" />

      {/* Spiral sinekler (etrafta uçuşan) */}
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * 72 + 30) * (Math.PI / 180);
          const cx = 100 + Math.cos(angle) * 75;
          const cy = 60 + Math.sin(angle) * 50;
          return (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <ellipse cx="0" cy="0" rx="3" ry="2" fill="#1a1a1a" />
              <ellipse cx="-1.5" cy="-2" rx="3" ry="2" fill="#3a3a3a" opacity="0.7" />
              <ellipse cx="1.5" cy="-2" rx="3" ry="2" fill="#3a3a3a" opacity="0.7" />
            </g>
          );
        })}
      </g>

      {/* Kıvımlı üst kısım (spiral) */}
      <g>
        {/* Ana gövde — kıvrımlı üst, genişleyen alt */}
        <path
          d="M 100 30
             C 70 30, 55 50, 60 75
             C 50 80, 35 95, 35 120
             C 25 130, 20 155, 35 170
             C 50 185, 150 185, 165 170
             C 180 155, 175 130, 165 120
             C 165 95, 150 80, 140 75
             C 145 50, 130 30, 100 30 Z"
          fill="url(#bokBody)"
          stroke="#2a1f0a"
          strokeWidth="3"
        />

        {/* Kıvrım detayları (spiral hatları) */}
        <path
          d="M 70 60 Q 100 50 130 60"
          stroke="#3a2e10"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 55 95 Q 100 85 145 95"
          stroke="#3a2e10"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 45 130 Q 100 120 155 130"
          stroke="#3a2e10"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M 40 160 Q 100 150 160 160"
          stroke="#3a2e10"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
        />

        {/* Spiral merkez (üst kısım) */}
        <path
          d="M 100 35
             C 90 40, 90 50, 100 55
             C 110 50, 110 40, 100 35 Z"
          fill="#3a2e10"
          opacity="0.6"
        />
        <circle cx="100" cy="45" r="3" fill="#1a0e02" />

        {/* Islak parlama */}
        <ellipse cx="75" cy="80" rx="20" ry="8" fill="url(#wetShine)" />
        <ellipse cx="130" cy="105" rx="15" ry="6" fill="url(#wetShine)" opacity="0.6" />
      </g>

      {/* Üzgün yüz */}
      <g>
        {/* Gözler (X — ölü/üzgün) */}
        <g stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round">
          <line x1="68" y1="105" x2="80" y2="117" />
          <line x1="80" y1="105" x2="68" y2="117" />
          <line x1="120" y1="105" x2="132" y2="117" />
          <line x1="132" y1="105" x2="120" y2="117" />
        </g>
        {/* Ağlayan gözyaşları */}
        <ellipse cx="74" cy="125" rx="2.5" ry="5" fill="#7dd3fc" opacity="0.8" />
        <ellipse cx="126" cy="125" rx="2.5" ry="5" fill="#7dd3fc" opacity="0.8" />
        {/* Ağız — kıvrımlı üzgün */}
        <path
          d="M 80 145 Q 100 135 120 145"
          stroke="#0a0a0a"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Kokutma efektleri — yeşil duman */}
      <g opacity="0.6">
        <circle cx="50" cy="50" r="8" fill="#65a30d" opacity="0.4" />
        <circle cx="40" cy="35" r="6" fill="#84cc16" opacity="0.3" />
        <circle cx="150" cy="45" r="7" fill="#65a30d" opacity="0.4" />
        <circle cx="160" cy="30" r="5" fill="#84cc16" opacity="0.3" />
        <circle cx="55" cy="20" r="4" fill="#a3e635" opacity="0.3" />
        <circle cx="145" cy="20" r="4" fill="#a3e635" opacity="0.3" />
      </g>
    </svg>
  );
}
