import { useEffect, useState } from 'react';

interface OnlineMenuProps {
  onMatchmaking: () => void;
  onHost: () => void;
  onJoin: () => void;
  onBack: () => void;
}

export function OnlineMenu({ onMatchmaking, onHost, onJoin, onBack }: OnlineMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto p-3 sm:p-6"
      style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
      }}
    >
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-blue-950/30 to-stone-950" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(59, 130, 246, 0.05) 50px, rgba(59, 130, 246, 0.05) 100px)',
          }}
        />
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <style>{`
        @keyframes oDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes oUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .o-down { animation: oDown 0.6s ease-out both; }
        .o-up { animation: oUp 0.6s ease-out both; }
      `}</style>

      <div className={`relative z-10 w-full max-w-md ${mounted ? 'o-down' : 'opacity-0'}`}>
        <button
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← Geri
        </button>

        <div className="mb-4 text-center sm:mb-6">
          <div className="mb-1 flex items-center justify-center gap-2 text-blue-300/80">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-blue-500 sm:w-16" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
              🌍 Çevrimiçi
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-500 sm:w-16" />
          </div>
          <h1 className="bg-gradient-to-br from-blue-200 via-blue-400 to-blue-700 bg-clip-text text-3xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-4xl">
            ÇEVRİMİÇİ OYNA
          </h1>
          <p className="mt-1 text-[11px] text-blue-200/60 sm:mt-2 sm:text-sm">
            Dünyanın dört bir yanından bir rakiple satranç oyna
          </p>
        </div>

        <div className={`space-y-2.5 sm:space-y-3 ${mounted ? 'o-up' : 'opacity-0'}`}>
          <button
            onClick={onMatchmaking}
            className="group flex w-full items-center gap-3 rounded-xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/60 to-stone-900/80 p-3 text-left shadow-2xl shadow-blue-500/20 backdrop-blur transition active:scale-[0.98] hover:border-blue-400 hover:shadow-blue-500/40 sm:gap-4 sm:p-4"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-2xl shadow-lg ring-2 ring-blue-400 sm:h-14 sm:w-14 sm:text-3xl">
              ⚡
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-blue-100 sm:text-lg">Hızlı Eşleşme</h2>
              <p className="text-[11px] text-blue-200/70 sm:text-xs">
                Bir rakip bul ve hemen savaşa başla
              </p>
            </div>
            <span className="text-xl text-blue-400 sm:text-2xl">→</span>
          </button>

          <button
            onClick={onHost}
            className="group flex w-full items-center gap-3 rounded-xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-900/60 to-stone-900/80 p-3 text-left shadow-2xl shadow-amber-500/20 backdrop-blur transition active:scale-[0.98] hover:border-amber-400 hover:shadow-amber-500/40 sm:gap-4 sm:p-4"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-900 text-2xl shadow-lg ring-2 ring-amber-400 sm:h-14 sm:w-14 sm:text-3xl">
              🏰
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-amber-100 sm:text-lg">Oda Oluştur</h2>
              <p className="text-[11px] text-amber-200/70 sm:text-xs">
                Davet linkini arkadaşınla paylaş
              </p>
            </div>
            <span className="text-xl text-amber-400 sm:text-2xl">→</span>
          </button>

          <button
            onClick={onJoin}
            className="group flex w-full items-center gap-3 rounded-xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-900/60 to-stone-900/80 p-3 text-left shadow-2xl shadow-emerald-500/20 backdrop-blur transition active:scale-[0.98] hover:border-emerald-400 hover:shadow-emerald-500/40 sm:gap-4 sm:p-4"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-900 text-2xl shadow-lg ring-2 ring-emerald-400 sm:h-14 sm:w-14 sm:text-3xl">
              🔗
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold text-emerald-100 sm:text-lg">Kod ile Katıl</h2>
              <p className="text-[11px] text-emerald-200/70 sm:text-xs">
                Oda kodunu gir ve oyuna gir
              </p>
            </div>
            <span className="text-xl text-emerald-400 sm:text-2xl">→</span>
          </button>
        </div>

        <div className="mt-4 rounded-lg border border-blue-700/40 bg-blue-950/30 p-2 text-center text-[10px] text-blue-200/60 sm:mt-6 sm:p-3 sm:text-[11px]">
          ℹ️ Peer-to-peer bağlantı · Sunucu yok · Düşük gecikme
        </div>
      </div>
    </div>
  );
}
