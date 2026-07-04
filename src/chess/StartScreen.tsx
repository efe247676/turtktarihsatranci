import { useEffect, useState } from 'react';

interface StartScreenProps {
  onOpenBattles: () => void;
  onOpenOnline: () => void;
  onBackToLanding?: () => void;
}

export function StartScreen({ onOpenBattles, onOpenOnline, onBackToLanding }: StartScreenProps) {
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
      {/* Animated background battlefield */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/40 to-stone-950" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(217, 119, 6, 0.06) 50px, rgba(217, 119, 6, 0.06) 100px)',
          }}
        />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-700/8 blur-2xl"
            style={{
              width: `${80 + i * 25}px`,
              height: `${80 + i * 25}px`,
              top: `${(i * 17) % 80}%`,
              left: `${(i * 23) % 90}%`,
              animation: `float ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(20px, -30px) scale(1.2); opacity: 0.5; }
        }
        @keyframes menuDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        .menu-down { animation: menuDown 0.8s ease-out both; }
        .menu-up { animation: menuUp 0.8s ease-out both; }
        .menu-fade { animation: menuFade 1s ease-out both; }
      `}</style>

      {/* Ana sayfaya dön */}
      {onBackToLanding && (
        <button
          onClick={onBackToLanding}
          className="fixed left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:left-6 sm:top-6 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← Ana Sayfa
        </button>
      )}

      {/* Decorative swords on sides */}
      <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 select-none text-5xl opacity-20 sm:left-6 sm:text-7xl">
        ⚔
      </div>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-5xl opacity-20 sm:right-6 sm:text-7xl">
        ⚔
      </div>

      {/* Title */}
      <div
        className={`relative z-10 mb-3 text-center sm:mb-6 ${
          mounted ? 'menu-down' : 'opacity-0'
        }`}
      >
        <div className="mb-1 flex items-center justify-center gap-1.5 text-amber-300/80 sm:mb-2 sm:gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500 sm:w-24" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]">
            ♔ 1402'den 1514'e Bir Yolculuk ♔
          </span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500 sm:w-24" />
        </div>
        <h1 className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-6xl md:text-7xl">
          TÜRK
        </h1>
        <div className="my-1 flex items-center justify-center gap-3 sm:my-2 sm:gap-4">
          <span className="h-0.5 w-10 bg-gradient-to-r from-transparent to-amber-500 sm:w-24" />
          <span className="text-2xl font-bold text-red-500 sm:text-4xl" style={{ animation: 'shake 2s ease-in-out infinite' }}>
            ⚔ TARİHİ ⚔
          </span>
          <span className="h-0.5 w-10 bg-gradient-to-l from-transparent to-amber-500 sm:w-24" />
        </div>
        <h1 className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-4xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-6xl md:text-7xl">
          SATRANCI
        </h1>
        <p className="mt-2 px-2 text-[11px] italic text-amber-200/70 sm:mt-4 sm:text-sm">
          "Tarih tahtada yeniden canlanıyor"
        </p>
        <p className="mt-1 text-[10px] text-amber-200/50 sm:text-[11px]">
          İki büyük muharebe, iki farklı çağ, tek bir satranç tahtası
        </p>
      </div>

      {/* Battle cards preview */}
      <div
        className={`relative z-10 mb-4 grid w-full max-w-2xl grid-cols-1 gap-2 sm:mb-6 sm:grid-cols-2 sm:gap-3 ${
          mounted ? 'menu-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        <div className="rounded-xl border-2 border-amber-700/50 bg-stone-900/60 p-3 backdrop-blur-sm sm:p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300 sm:text-xs">
            ⚔️ 1402 • Ankara
          </div>
          <div className="mt-0.5 text-sm font-bold text-amber-100 sm:text-base">
            Bayezid vs Timur
          </div>
          <p className="mt-0.5 text-[10px] text-amber-200/70 sm:text-[11px]">
            Anadolu'nun iki hükümdarı bir ovanın kaderi için
          </p>
        </div>
        <div className="rounded-xl border-2 border-red-700/50 bg-stone-900/60 p-3 backdrop-blur-sm sm:p-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-red-300 sm:text-xs">
            🔴 1514 • Çaldıran
          </div>
          <div className="mt-0.5 text-sm font-bold text-red-100 sm:text-base">
            Yavuz vs Şah İsmail
          </div>
          <p className="mt-0.5 text-[10px] text-red-200/70 sm:text-[11px]">
            Top ve tüfek karşısında süvari devri kapanıyor
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`relative z-10 flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:gap-3 ${
          mounted ? 'menu-fade' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.5s' }}
      >
        <button
          onClick={onOpenBattles}
          className="group relative flex-1 overflow-hidden rounded-2xl border-2 border-amber-400 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 px-6 py-3.5 text-base font-black tracking-wider text-amber-50 shadow-2xl shadow-amber-500/50 transition active:scale-95 sm:px-10 sm:py-4 sm:text-xl sm:tracking-widest"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            <span>⚔</span>
            <span>YEREL SAVAŞ</span>
            <span>⚔</span>
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
        <button
          onClick={onOpenOnline}
          className="group relative flex-1 overflow-hidden rounded-2xl border-2 border-blue-400 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 px-6 py-3.5 text-base font-black tracking-wider text-blue-50 shadow-2xl shadow-blue-500/50 transition active:scale-95 sm:px-10 sm:py-4 sm:text-xl sm:tracking-widest"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            <span>🌍</span>
            <span>ÇEVRİMİÇİ</span>
            <span>🌍</span>
          </span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>

      <p className="relative z-10 mt-3 text-center text-[9px] text-amber-200/50 sm:mt-4 sm:text-xs">
        Yerel: AI veya 2 kişilik · Çevrimiçi: internete karşı
      </p>

      {/* Footer */}
      <div className="relative z-10 mt-4 text-center text-[10px] text-amber-200/40 sm:absolute sm:bottom-4 sm:left-0 sm:right-0 sm:mt-0 sm:text-xs">
        <p>🏰 Tarihi Satranç Macerası 🏰</p>
      </div>
    </div>
  );
}
