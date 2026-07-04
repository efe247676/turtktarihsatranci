import type { Piece } from './types';

interface PieceIconProps {
  piece: Piece;
  size?: number;
}

// Custom SVG icons themed to Ottoman (yeşil) vs Safevi/Timurid (kırmızı)
// Osmanlı = beyaz taş = yeşil tonları (İslam bayrağı)
// Rakip (Timurlu / Safevi) = siyah taş = kırmızı tonları
const OttomanColors = {
  white: { main: '#16a34a', stroke: '#052e16', accent: '#fde047' }, // orta-doygun yeşil gövde, koyu yeşil kenar, altın sarısı hilal/vurgu
  black: { main: '#991b1b', stroke: '#450a0a', accent: '#fbbf24' }, // derin kırmızı gövde, çok koyu kırmızı kenar, altın vurgu
};

export function PieceIcon({ piece, size = 48 }: PieceIconProps) {
  const colors = piece.color === 'white' ? OttomanColors.white : OttomanColors.black;
  const common = {
    width: '100%',
    height: '100%',
    viewBox: '0 0 100 100',
    preserveAspectRatio: 'xMidYMid meet',
  };
  // size is kept for API compatibility but ignored (we use 100% sizing)
  void size;

  switch (piece.type) {
    case 'pawn':
      // Yeniçeri (white) / Mirza (black) - simple soldier with helmet
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`pawn-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Helmet */}
          <ellipse cx="50" cy="28" rx="14" ry="14" fill={`url(#pawn-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          <rect x="36" y="24" width="28" height="3" fill={colors.accent} />
          {/* Body */}
          <path d="M 30 50 Q 50 40 70 50 L 65 80 L 35 80 Z" fill={`url(#pawn-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Base */}
          <ellipse cx="50" cy="85" rx="22" ry="6" fill={`url(#pawn-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Spear */}
          <line x1="78" y1="20" x2="78" y2="75" stroke={colors.stroke} strokeWidth="2" />
          <polygon points="78,15 74,22 82,22" fill={colors.accent} />
        </svg>
      );

    case 'rook':
      // Sipahi / Tümen Komutanı - tower with crescent
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`rook-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Battlements */}
          <rect x="28" y="20" width="10" height="12" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          <rect x="44" y="20" width="10" height="12" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          <rect x="60" y="20" width="10" height="12" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          <rect x="25" y="32" width="50" height="8" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Tower body */}
          <rect x="30" y="40" width="40" height="35" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Door */}
          <path d="M 45 75 L 45 60 Q 50 55 55 60 L 55 75 Z" fill={colors.accent} stroke={colors.stroke} strokeWidth="1.5" />
          {/* Crescent */}
          <path d="M 50 50 A 8 8 0 1 0 50 64 A 6 6 0 1 1 50 50" fill={colors.accent} stroke={colors.stroke} strokeWidth="1" />
          {/* Base */}
          <rect x="22" y="80" width="56" height="8" fill={`url(#rook-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" rx="2" />
        </svg>
      );

    case 'knight':
      // Akıncı / Bahadır - horse head
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`knight-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Horse head profile */}
          <path
            d="M 25 75 L 25 55 Q 20 45 30 40 Q 35 30 45 28 Q 60 22 70 30 L 78 35 L 82 45 L 78 55 Q 75 60 80 65 L 80 75 Z"
            fill={`url(#knight-grad-${piece.color})`}
            stroke={colors.stroke}
            strokeWidth="2"
          />
          {/* Mane */}
          <path d="M 45 28 Q 50 20 60 22 L 55 32 Z" fill={colors.accent} stroke={colors.stroke} strokeWidth="1.5" />
          {/* Eye */}
          <circle cx="62" cy="42" r="2.5" fill={colors.stroke} />
          {/* Nostril */}
          <circle cx="75" cy="50" r="1.5" fill={colors.stroke} />
          {/* Base */}
          <ellipse cx="52" cy="80" rx="28" ry="6" fill={`url(#knight-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
        </svg>
      );

    case 'bishop':
      // Vezir - mitre with tughra
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`bishop-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Mitre top */}
          <path d="M 50 15 Q 35 30 38 50 L 62 50 Q 65 30 50 15 Z" fill={`url(#bishop-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Slash */}
          <line x1="42" y1="25" x2="58" y2="40" stroke={colors.accent} strokeWidth="3" />
          <circle cx="50" cy="20" r="3" fill={colors.accent} stroke={colors.stroke} strokeWidth="1" />
          {/* Body */}
          <path d="M 30 75 Q 30 50 50 50 Q 70 50 70 75 Z" fill={`url(#bishop-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Decorative band */}
          <rect x="30" y="60" width="40" height="4" fill={colors.accent} />
          {/* Base */}
          <ellipse cx="50" cy="82" rx="26" ry="6" fill={`url(#bishop-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
        </svg>
      );

    case 'queen':
      // Sadrazam / Emîrü'l-Ümerâ - crown with many points
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`queen-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Crown points */}
          <polygon points="30,40 32,22 38,32" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          <polygon points="42,38 46,15 50,35" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          <polygon points="58,38 54,15 50,35" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          <polygon points="70,40 68,22 62,32" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          {/* Crown band */}
          <rect x="28" y="40" width="44" height="8" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Jewels */}
          <circle cx="35" cy="44" r="2" fill={colors.accent} />
          <circle cx="50" cy="44" r="2.5" fill={colors.accent} />
          <circle cx="65" cy="44" r="2" fill={colors.accent} />
          {/* Body */}
          <path d="M 30 75 Q 30 48 50 48 Q 70 48 70 75 Z" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Base */}
          <ellipse cx="50" cy="82" rx="26" ry="6" fill={`url(#queen-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
        </svg>
      );

    case 'king':
      // Padişah / Timur - king with ornate crown
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`king-grad-${piece.color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.main} stopOpacity={1} />
              <stop offset="100%" stopColor={colors.main} stopOpacity={0.7} />
            </linearGradient>
          </defs>
          {/* Cross on top */}
          <rect x="48" y="5" width="4" height="14" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          <rect x="44" y="9" width="12" height="4" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="1.5" />
          {/* Crown */}
          <rect x="30" y="20" width="40" height="10" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          <polygon points="30,20 50,10 70,20" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Jewels */}
          <circle cx="40" cy="25" r="2.5" fill={colors.accent} />
          <circle cx="50" cy="22" r="3" fill={colors.accent} stroke={colors.stroke} strokeWidth="0.5" />
          <circle cx="60" cy="25" r="2.5" fill={colors.accent} />
          {/* Body */}
          <path d="M 30 75 Q 30 50 50 50 Q 70 50 70 75 Z" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
          {/* Decorative sash */}
          <path d="M 35 60 Q 50 65 65 60" stroke={colors.accent} strokeWidth="2" fill="none" />
          {/* Base */}
          <ellipse cx="50" cy="82" rx="26" ry="6" fill={`url(#king-grad-${piece.color})`} stroke={colors.stroke} strokeWidth="2" />
        </svg>
      );
  }
}

import type { Campaign } from './campaigns';

export function getPieceName(piece: Piece, campaign?: Campaign): string {
  if (campaign) {
    return piece.color === 'white' ? campaign.osmanli[piece.type] : campaign.enemy[piece.type];
  }
  // Fallback (Ankara 1402) — geriye dönük uyumluluk
  return piece.color === 'white'
    ? ({ pawn: 'Yeniçeri', rook: 'Sipahi', knight: 'Akıncı', bishop: 'Vezir', queen: 'Sadrazam', king: 'Bayezid' }[piece.type])
    : ({ pawn: 'Mirza', rook: 'Tümen Komutanı', knight: 'Bahadır', bishop: 'Vezir-i Azam', queen: 'Emirü’l-Ümera', king: 'Timur' }[piece.type]);
}
