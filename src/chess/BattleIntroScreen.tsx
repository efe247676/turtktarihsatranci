import { useEffect, useState } from 'react';
import { PieceIcon } from './pieces';
import type { Campaign } from './campaigns';
import type { Piece } from './types';

interface BattleIntroScreenProps {
  campaign: Campaign;
  onStart: (options: { vsAI: boolean; difficulty: 'easy' | 'medium' | 'hard' }) => void;
  onBack: () => void;
}

export function BattleIntroScreen({ campaign, onStart, onBack }: BattleIntroScreenProps) {
  const [vsAI, setVsAI] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const osmanliKing: Piece = { type: 'king', color: 'white' };
  const enemyKing: Piece = { type: 'king', color: 'black' };

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto p-3 sm:p-6 bg-gradient-to-br ${campaign.bgGradient}`}
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
      }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(217, 119, 6, 0.08) 40px, rgba(217, 119, 6, 0.08) 80px)',
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <style>{`
        @keyframes introDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes introUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes introLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes introRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        .intro-down { animation: introDown 0.7s ease-out both; }
        .intro-up { animation: introUp 0.7s ease-out both; animation-delay: 0.3s; }
        .intro-left { animation: introLeft 0.7s ease-out both; animation-delay: 0.2s; }
        .intro-right { animation: introRight 0.7s ease-out both; animation-delay: 0.2s; }
        .intro-fade { animation: introDown 0.7s ease-out both; animation-delay: 0.5s; }
      `}</style>

      {/* Top bar with back button */}
      <div className={`relative z-10 w-full max-w-3xl ${mounted ? 'intro-down' : 'opacity-0'}`}>
        <button
          onClick={onBack}
          className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← Savaş Seçimi
        </button>
      </div>

      {/* Title */}
      <div className={`relative z-10 mb-3 text-center sm:mb-6 ${mounted ? 'intro-down' : 'opacity-0'}`}>
        <div className="mb-1 flex items-center justify-center gap-1.5 text-amber-300/80 sm:gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500 sm:w-24" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]">
            ⚔ {campaign.year} • {campaign.location} ⚔
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500 sm:w-24" />
        </div>
        <h1 className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-3xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-5xl md:text-6xl">
          {campaign.name.toUpperCase()}
        </h1>
        <p className="mt-2 text-[11px] italic text-amber-200/70 sm:mt-3 sm:text-sm">
          "{campaign.tagline}"
        </p>
      </div>

      {/* Rulers */}
      <div className="relative z-10 mb-4 grid w-full max-w-3xl grid-cols-1 gap-2 sm:mb-6 sm:grid-cols-2 sm:gap-4">
        {/* Osmanlı */}
        <div
          className={`group relative overflow-hidden rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/60 to-stone-900/80 p-3 shadow-2xl shadow-emerald-500/20 backdrop-blur-sm sm:p-5 ${
            mounted ? 'intro-left' : 'opacity-0'
          }`}
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
          <div className="relative flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-emerald-950 shadow-2xl ring-2 ring-emerald-400 sm:h-20 sm:w-20">
              <div className="h-10 w-10 sm:h-16 sm:w-16">
                <PieceIcon piece={osmanliKing} size={80} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-300 sm:text-[10px]">
                🌙 Beyaz Taşlar
              </div>
              <h2 className="truncate text-base font-black text-emerald-100 sm:text-xl">
                {campaign.osmanliRulerTitle}
              </h2>
              <p className="text-[10px] text-emerald-200/80 sm:text-xs">
                {campaign.osmanli.king} komutasında
              </p>
              <p className="mt-0.5 text-[9px] italic text-emerald-300/70 sm:mt-1 sm:text-[10px]">
                "{campaign.osmanliQuote}"
              </p>
            </div>
          </div>
        </div>

        {/* Enemy */}
        <div
          className={`group relative overflow-hidden rounded-xl border-2 ${
            campaign.enemyAccent.secondary
          } bg-gradient-to-br from-stone-900/80 to-stone-950/90 p-3 shadow-2xl ${campaign.enemyAccent.glow} backdrop-blur-sm sm:p-5 ${
            mounted ? 'intro-right' : 'opacity-0'
          }`}
        >
          <div className={`absolute -left-8 -top-8 h-32 w-32 rounded-full ${
            campaign.id === 'caldiran1514' ? 'bg-red-500/10' : 'bg-red-500/10'
          } blur-2xl`} />
          <div className="relative flex items-center gap-2.5 sm:gap-3">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
              campaign.id === 'caldiran1514'
                ? 'from-red-800 to-stone-950 ring-red-400'
                : 'from-red-900 to-stone-950 ring-red-400'
            } shadow-2xl ring-2 sm:h-20 sm:w-20`}>
              <div className="h-10 w-10 sm:h-16 sm:w-16">
                <PieceIcon piece={enemyKing} size={80} />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className={`text-[9px] font-bold uppercase tracking-widest ${campaign.enemyAccent.primary} sm:text-[10px]`}>
                {campaign.enemyAccent.icon} {campaign.enemyName}
              </div>
              <h2 className={`truncate text-base font-black ${campaign.enemyAccent.primary} sm:text-xl`}>
                {campaign.enemyRulerTitle}
              </h2>
              <p className={`text-[10px] ${campaign.enemyAccent.primary} opacity-80 sm:text-xs`}>
                {campaign.enemy.king} komutasında
              </p>
              <p className={`mt-0.5 text-[9px] italic ${campaign.enemyAccent.primary} opacity-70 sm:mt-1 sm:text-[10px]`}>
                "{campaign.enemyQuote}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brief history */}
      <div
        className={`relative z-10 mb-4 w-full max-w-2xl rounded-xl border border-amber-700/40 bg-stone-900/70 p-3 shadow-xl backdrop-blur sm:mb-6 sm:p-4 ${
          mounted ? 'intro-up' : 'opacity-0'
        }`}
      >
        <h3 className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300 sm:mb-2 sm:text-xs">
          📜 Savaşın Hikâyesi
        </h3>
        <ul className="space-y-0.5 text-[10px] text-amber-100/80 sm:space-y-1 sm:text-xs">
          {campaign.history.map((line, i) => (
            <li key={i} className="flex gap-1.5">
              <span className="shrink-0 text-amber-500">▸</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Game options */}
      <div
        className={`relative z-10 mb-4 w-full max-w-md space-y-2.5 sm:mb-6 sm:space-y-3 ${
          mounted ? 'intro-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.4s' }}
      >
        <div className="rounded-xl border border-amber-700/50 bg-stone-900/70 p-3 shadow-xl backdrop-blur-sm sm:p-4">
          <div className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300 sm:mb-2 sm:text-xs">
            🎮 Oyun Modu
          </div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => setVsAI(true)}
              className={`rounded-lg border-2 px-2 py-2.5 text-xs font-bold transition active:scale-95 sm:px-3 sm:py-3 sm:text-sm ${
                vsAI
                  ? 'border-amber-400 bg-amber-500/20 text-amber-100 shadow-lg shadow-amber-500/30'
                  : 'border-stone-600 bg-stone-800/50 text-stone-300 active:bg-stone-700/50'
              }`}
            >
              🤖 Bilgisayara Karşı
            </button>
            <button
              onClick={() => setVsAI(false)}
              className={`rounded-lg border-2 px-2 py-2.5 text-xs font-bold transition active:scale-95 sm:px-3 sm:py-3 sm:text-sm ${
                !vsAI
                  ? 'border-amber-400 bg-amber-500/20 text-amber-100 shadow-lg shadow-amber-500/30'
                  : 'border-stone-600 bg-stone-800/50 text-stone-300 active:bg-stone-700/50'
              }`}
            >
              👥 İki Kişilik
            </button>
          </div>
        </div>

        {vsAI && (
          <div className="rounded-xl border border-amber-700/50 bg-stone-900/70 p-3 shadow-xl backdrop-blur-sm sm:p-4">
            <div className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300 sm:mb-2 sm:text-xs">
              ⚡ Zorluk Seviyesi
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {(['easy', 'medium', 'hard'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`rounded-lg border-2 px-1 py-2 text-[11px] font-bold transition active:scale-95 sm:px-2 sm:py-2.5 sm:text-xs ${
                    difficulty === d
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100 shadow-lg shadow-emerald-500/30'
                      : 'border-stone-600 bg-stone-800/50 text-stone-300 active:bg-stone-700/50'
                  }`}
                >
                  {d === 'easy' && '🟢 Kolay'}
                  {d === 'medium' && '🟡 Orta'}
                  {d === 'hard' && '🔴 Zor'}
                </button>
              ))}
            </div>
            <p className="mt-1.5 text-center text-[9px] text-stone-400 sm:mt-2 sm:text-[10px]">
              {difficulty === 'easy' &&
                `${campaign.enemyRulerTitle} acele ediyor, 2 hamle derinlik`}
              {difficulty === 'medium' &&
                `${campaign.enemyRulerTitle} stratejist, 3 hamle derinlik`}
              {difficulty === 'hard' &&
                `${campaign.enemyRulerTitle} dâhi, 4 hamle derinlik`}
            </p>
          </div>
        )}
      </div>

      {/* Start button */}
      <div className={`relative z-10 ${mounted ? 'intro-fade' : 'opacity-0'}`}>
        <button
          onClick={() => onStart({ vsAI, difficulty })}
          className="group relative overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 px-8 py-3.5 text-base font-black tracking-wider text-amber-50 shadow-2xl shadow-amber-500/50 transition active:scale-95 sm:px-16 sm:py-5 sm:text-2xl sm:tracking-widest"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="relative z-10 flex items-center gap-2 sm:gap-3">
            <span>⚔</span>
            <span>SAVAŞA BAŞLA</span>
            <span>⚔</span>
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </div>
  );
}
