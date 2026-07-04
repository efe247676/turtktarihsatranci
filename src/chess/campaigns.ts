import type { PieceColor, PieceType } from './types';

export interface PieceTheme {
  pawn: string;
  rook: string;
  knight: string;
  bishop: string;
  queen: string;
  king: string;
}

export interface Campaign {
  id: 'ankara1402' | 'caldiran1514';
  name: string;
  shortName: string;
  year: string;
  location: string;
  /** Beyaz taş teması (Osmanlı) */
  osmanli: PieceTheme;
  /** Siyah taş teması (rakip) */
  enemy: PieceTheme;
  /** Rakip devlet adı */
  enemyName: string;
  /** Rakip hükümdar unvanı */
  enemyRulerTitle: string;
  /** Osmanlı hükümdar unvanı */
  osmanliRulerTitle: string;
  /** Arka plan gradyan renkleri */
  bgGradient: string;
  /** Rakip renk şeması (kart rengi) */
  enemyAccent: {
    primary: string; // text-xxx
    secondary: string; // border-xxx
    glow: string; // shadow-xxx
    icon: string; // emoji
  };
  /** Sloganlar */
  osmanliQuote: string;
  enemyQuote: string;
  /** Kısa tarihçe (savaş bilgi paneli için) */
  history: string[];
  /** Hashtag/özet */
  tagline: string;
  /** Kazanan taraf lokuma, kaybeden boka dönüşsün (easter egg) */
  easterEgg?: boolean;
}

export const CAMPAIGNS: Record<Campaign['id'], Campaign> = {
  ankara1402: {
    id: 'ankara1402',
    name: 'Ankara Muharebesi',
    shortName: 'Ankara 1402',
    year: '1402',
    location: 'Ankara Ovası',
    osmanli: {
      pawn: 'Yeniçeri',
      rook: 'Sipahi',
      knight: 'Akıncı',
      bishop: 'Vezir',
      queen: 'Sadrazam',
      king: 'Bayezid',
    },
    enemy: {
      pawn: 'Mirza',
      rook: 'Tümen Komutanı',
      knight: 'Bahadır',
      bishop: 'Vezir-i Azam',
      queen: 'Emirü’l-Ümera',
      king: 'Timur',
    },
    enemyName: 'Timurlular',
    enemyRulerTitle: 'Emir Timur',
    osmanliRulerTitle: 'Sultan Bayezid',
    bgGradient: 'from-amber-950 via-stone-900 to-emerald-950',
    enemyAccent: {
      primary: 'text-red-300',
      secondary: 'border-red-500',
      glow: 'shadow-red-500/30',
      icon: '⚔️',
    },
    osmanliQuote: 'Devletimin bekası için çalışın.',
    enemyQuote: 'Korku yıldızlardadır.',
    history: [
      'Osmanlı Sultanı Bayezid, 1402 yazında Ankara Ovası’nda Timur’un ordusuyla karşılaştı.',
      'Timur’un tümenleri Osmanlı sağ ve sol kanatlarını kuşattı.',
      'Osmanlı Yeniçerileri kuşatmaya rağmen gün boyu direndi.',
      'Anadolu beyliklerinin ihaneti Osmanlı kanatlarının çökmesine yol açtı.',
      'Sultan Bayezid esir düştü, Fetret Devri başladı.',
    ],
    tagline: 'Anadolu’nun iki hükümdarı, bir ovanın kaderi',
  },
  caldiran1514: {
    id: 'caldiran1514',
    name: 'Çaldıran Muharebesi',
    shortName: 'Çaldıran 1514',
    year: '1514',
    location: 'Çaldıran Ovası, Hoy',
    osmanli: {
      pawn: 'Yeniçeri',
      rook: 'Sipahi',
      knight: 'Akıncı',
      bishop: 'Vezir',
      queen: 'Sadrazam',
      king: 'Yavuz',
    },
    enemy: {
      pawn: 'Kızılbaş',
      rook: 'Süvari Beyi',
      knight: 'Ezhere',
      bishop: 'Mürşid',
      queen: 'Vekil-i Saltanat',
      king: 'Şah İsmail',
    },
    enemyName: 'Safeviler',
    enemyRulerTitle: 'Şah İsmail',
    osmanliRulerTitle: 'Yavuz Sultan Selim',
    bgGradient: 'from-red-950 via-stone-900 to-emerald-950',
    enemyAccent: {
      primary: 'text-red-300',
      secondary: 'border-red-500',
      glow: 'shadow-red-500/30',
      icon: '🔴',
    },
    osmanliQuote: 'Kılıçla gelen, kılıçla gider.',
    enemyQuote: 'Biz ki bir baharıyız, bize yaz gelecek.',
    history: [
      'Yavuz Sultan Selim, Safevi tehdidini ortadan kaldırmak için 1514 baharında sefere çıktı.',
      'Şah İsmail Kızılbaş taktiklerine güveniyor, Osmanlı topçusuna hazırlıksız yakalandı.',
      '23 Ağustos 1514 sabahı Çaldıran Ovası’nda iki ordu karşı karşıya geldi.',
      'Osmanlı topları ve tüfekli Yeniçeriler Kızılbaş süvarilerini bozguna uğrattı.',
      'Şah İsmail savaş alanından kaçtı; Safevi hâkimiyeti doğuya çekildi.',
    ],
    tagline: 'Top ve tüfek karşısında süvari devri kapanıyor',
    easterEgg: true,
  },
};

/** Seçili kampanyaya göre taş ismini döndürür. */
export function getPieceDisplayName(
  type: PieceType,
  color: PieceColor,
  campaign: Campaign
): string {
  if (color === 'white') return campaign.osmanli[type];
  return campaign.enemy[type];
}
