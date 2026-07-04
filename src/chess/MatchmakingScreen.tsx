import { useEffect, useState } from 'react';
import { onlineService } from '../network/online';

interface MatchmakingScreenProps {
  onMatched: (role: 'host' | 'guest') => void;
  onBack: () => void;
}

export function MatchmakingScreen({ onMatched, onBack }: MatchmakingScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');

  useEffect(() => {
    const off = onlineService.on('status', () => {});
    void off;
    onlineService.setCallbacks({
      onPeerJoined: () => onMatched('host'),
      onError: (msg) => setError(msg),
    });

    // host olarak kuyruğa gir
    onlineService.hostRoom().then((code) => {
      setRoomCode(code);
    }).catch(() => {
      // hata zaten callback'le geldi
    });
  }, [onMatched]);

  const handleCancel = () => {
    onlineService.disconnect();
    onBack();
  };

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
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        .spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      <div className="relative z-10 w-full max-w-md text-center">
        <button
          onClick={handleCancel}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← İptal
        </button>

        {error ? (
          <div className="rounded-2xl border-2 border-red-500/50 bg-red-950/40 p-6 backdrop-blur">
            <div className="mb-2 text-4xl">⚠️</div>
            <h2 className="mb-2 text-lg font-bold text-red-200 sm:text-xl">Bağlantı Hatası</h2>
            <p className="text-sm text-red-200/80">{error}</p>
            <button
              onClick={handleCancel}
              className="mt-4 rounded-lg bg-red-700 px-6 py-2 text-sm font-semibold text-white shadow transition active:scale-95 hover:bg-red-600"
              style={{ touchAction: 'manipulation' }}
            >
              Geri Dön
            </button>
          </div>
        ) : (
          <>
            {/* Pulsing rings */}
            <div className="relative mx-auto mb-6 h-32 w-32 sm:mb-8 sm:h-40 sm:w-40">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/60 pulse-ring" />
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-500/60 pulse-ring"
                style={{ animationDelay: '0.6s' }}
              />
              <div
                className="absolute inset-0 rounded-full border-4 border-blue-500/60 pulse-ring"
                style={{ animationDelay: '1.2s' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 text-4xl shadow-2xl ring-4 ring-blue-400/50 sm:h-24 sm:w-24 sm:text-5xl">
                  ⚔️
                </div>
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-black text-blue-100 sm:text-3xl">
              Rakip Aranıyor...
            </h2>
            <p className="text-sm text-blue-200/70 sm:text-base">
              Dünyanın dört bir yanından bir hükümdar aranıyor
            </p>

            {roomCode && (
              <div className="mt-4 rounded-lg border border-blue-700/40 bg-blue-950/30 p-3 sm:mt-6">
                <p className="text-[10px] uppercase tracking-widest text-blue-300/80 sm:text-xs">
                  Oda Kodun
                </p>
                <p className="mt-1 font-mono text-2xl font-black tracking-widest text-blue-100 sm:text-3xl">
                  {roomCode}
                </p>
                <p className="mt-1 text-[10px] text-blue-200/60 sm:text-[11px]">
                  Arkadaşınla paylaş, hemen başlasın!
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-blue-300/60 sm:mt-8 sm:text-xs">
              <span className="spin-slow inline-block">⟳</span>
              <span>Kuyrukta bekleniyor...</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
