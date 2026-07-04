import { useEffect, useState } from 'react';
import { CAMPAIGNS, type Campaign } from './campaigns';
import { PieceIcon } from './pieces';
import type { Piece } from './types';

interface BattleSelectScreenProps {
  onSelect: (campaign: Campaign) => void;
  onBack: () => void;
}

export function BattleSelectScreen({ onSelect, onBack }: BattleSelectScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const campaigns = Object.values(CAMPAIGNS);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden overflow-y-auto p-3 sm:p-6"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
      }}
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(217, 119, 6, 0.05) 50px, rgba(217, 119, 6, 0.05) 100px)',
          }}
        />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .anim-fade-up { animation: fadeUp 0.7s ease-out both; }
        .anim-fade-down { animation: fadeDown 0.7s ease-out both; }
      `}</style>

      {/* Header */}
      <div className={`relative z-10 mb-3 w-full max-w-4xl sm:mb-6 ${mounted ? 'anim-fade-down' : 'opacity-0'}`}>
        <button
          onClick={onBack}
          className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← Ana Menü
        </button>
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-2 text-amber-300/80">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500 sm:w-16" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
              🗺 Savaş Seçimi
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500 sm:w-16" />
          </div>
          <h1 className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-4xl md:text-5xl">
            TARİHİ BİR MEYDAN SEÇ
          </h1>
          <p className="mt-1 text-[11px] text-amber-200/60 sm:mt-2 sm:text-sm">
            İki büyük muharebe, iki farklı çağ, tek bir satranç tahtası
          </p>
        </div>
      </div>

      {/* Battle cards */}
      <div
        className={`relative z-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 ${
          mounted ? 'anim-fade-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        {campaigns.map((campaign) => (
          <BattleCard key={campaign.id} campaign={campaign} onSelect={() => onSelect(campaign)} />
        ))}
      </div>

      <p className="relative z-10 mt-4 text-center text-[10px] text-amber-200/40 sm:mt-6 sm:text-xs">
        Daha fazla savaş yakında eklenecek...
      </p>
    </div>
  );
}

function BattleCard({ campaign, onSelect }: { campaign: Campaign; onSelect: () => void }) {
  const osmanliKing: Piece = { type: 'king', color: 'white' };
  const enemyKing: Piece = { type: 'king', color: 'black' };

  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl border-2 border-amber-700/40 bg-gradient-to-br ${campaign.bgGradient} p-4 text-left shadow-2xl transition active:scale-[0.98] hover:border-amber-400 hover:shadow-amber-500/30 sm:p-6`}
      style={{ touchAction: 'manipulation' }}
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition group-hover:bg-amber-400/20" />

      {/* Year badge */}
      <div className="mb-2 flex items-center justify-between sm:mb-3">
        <span className="rounded-full border border-amber-500/60 bg-amber-950/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 sm:px-3 sm:py-1 sm:text-xs">
          📅 {campaign.year}
        </span>
        <span className="text-[10px] text-amber-200/60 sm:text-xs">📍 {campaign.location}</span>
      </div>

      <h2 className="mb-1 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-2xl font-black text-transparent sm:text-3xl">
        {campaign.name}
      </h2>
      <p className="mb-3 text-[11px] italic text-amber-200/70 sm:mb-4 sm:text-sm">
        "{campaign.tagline}"
      </p>

      {/* Combatants */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:mb-4 sm:gap-3">
        <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/40 p-2 sm:p-3">
          <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
            <div className="h-8 w-8 sm:h-10 sm:w-10">
              <PieceIcon piece={osmanliKing} size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 sm:text-[10px]">
                🌙 Osmanlılar
              </div>
              <div className="truncate text-xs font-bold text-emerald-100 sm:text-sm">
                {campaign.osmanliRulerTitle}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-lg border ${campaign.enemyAccent.secondary} bg-stone-950/50 p-2 sm:p-3`}>
          <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
            <div className="h-8 w-8 sm:h-10 sm:w-10">
              <PieceIcon piece={enemyKing} size={40} />
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[9px] font-bold uppercase tracking-wider ${campaign.enemyAccent.primary} sm:text-[10px]`}>
                {campaign.enemyAccent.icon} {campaign.enemyName}
              </div>
              <div className={`truncate text-xs font-bold ${campaign.enemyAccent.primary} sm:text-sm`}>
                {campaign.enemyRulerTitle}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Piece names preview */}
      <div className="mb-3 space-y-0.5 text-[10px] text-amber-100/80 sm:mb-4 sm:text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 shrink-0 text-emerald-400">♚</span>
          <span className="truncate">
            <span className="text-emerald-300">{campaign.osmanli.king}</span>
            <span className="mx-1 text-stone-500">vs</span>
            <span className={campaign.enemyAccent.primary}>{campaign.enemy.king}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 shrink-0 text-emerald-400">♟</span>
          <span className="truncate">
            <span className="text-emerald-300">{campaign.osmanli.pawn}</span>
            <span className="mx-1 text-stone-500">vs</span>
            <span className={campaign.enemyAccent.primary}>{campaign.enemy.pawn}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 shrink-0 text-emerald-400">♜</span>
          <span className="truncate">
            <span className="text-emerald-300">{campaign.osmanli.rook}</span>
            <span className="mx-1 text-stone-500">vs</span>
            <span className={campaign.enemyAccent.primary}>{campaign.enemy.rook}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-amber-700/30 pt-2 sm:pt-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80 sm:text-xs">
          Bu Meydana Git →
        </span>
        <span className="text-lg sm:text-xl">⚔️</span>
      </div>
    </button>
  );
}
