import { useEffect, useState } from 'react';
import { onlineService, type OnlineStatus } from '../network/online';

interface InviteGuestScreenProps {
  initialCode?: string;
  onConnected: () => void;
  onBack: () => void;
}

export function InviteGuestScreen({ initialCode, onConnected, onBack }: InviteGuestScreenProps) {
  const [code, setCode] = useState(initialCode ?? '');
  const [status, setStatus] = useState<OnlineStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const off = onlineService.on('status', (s) => setStatus(s));
    onlineService.setCallbacks({
      onPeerJoined: () => onConnected(),
      onError: (msg) => setError(msg),
    });

    // URL'den gelen ?room=CODE otomatik olarak input'a yerleşir
    const onAutoJoin = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail) setCode(ce.detail);
    };
    window.addEventListener('auto-join-room', onAutoJoin);

    return () => {
      off();
      window.removeEventListener('auto-join-room', onAutoJoin);
    };
  }, [onConnected]);

  const handleJoin = async () => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length < 4) {
      setError('Geçerli bir oda kodu girin');
      return;
    }
    setError(null);
    try {
      await onlineService.joinRoom(trimmed);
    } catch {
      // hata callback'le geldi
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-emerald-950/30 to-stone-950" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={handleCancel}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← İptal
        </button>

        <div className="mb-4 text-center sm:mb-6">
          <div className="mb-1 flex items-center justify-center gap-2 text-emerald-300/80">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500 sm:w-16" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
              🔗 Odaya Katıl
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500 sm:w-16" />
          </div>
          <h1 className="bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-700 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-3xl">
            ODA KODUNU GİR
          </h1>
          <p className="mt-1 text-[11px] text-emerald-200/60 sm:mt-2 sm:text-sm">
            Arkadaşının oluşturduğu odaya katıl
          </p>
        </div>

        {error && (
          <div className="mb-3 rounded-lg border border-red-500/50 bg-red-950/40 p-2.5 text-center text-[11px] text-red-200 sm:mb-4 sm:p-3 sm:text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="mb-3 rounded-2xl border-2 border-emerald-500/50 bg-stone-900/70 p-4 shadow-2xl backdrop-blur sm:mb-4 sm:p-5">
          <label className="mb-1.5 block text-center text-[10px] font-bold uppercase tracking-widest text-emerald-300/80 sm:mb-2 sm:text-xs">
            6 Haneli Oda Kodu
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleJoin();
            }}
            placeholder="ABC123"
            autoFocus
            maxLength={6}
            className="w-full rounded-lg border-2 border-emerald-700/50 bg-stone-950/60 px-3 py-3 text-center font-mono text-2xl font-black tracking-widest text-emerald-100 placeholder-emerald-700/40 outline-none transition focus:border-emerald-400 sm:py-4 sm:text-3xl"
            style={{ touchAction: 'manipulation' }}
          />
          <button
            onClick={handleJoin}
            disabled={status === 'connecting' || status === 'creating'}
            className="mt-2 w-full rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 px-3 py-2.5 text-sm font-bold text-white shadow-lg transition active:scale-95 hover:from-emerald-500 hover:to-emerald-700 disabled:opacity-50 sm:mt-3 sm:py-3 sm:text-base"
            style={{ touchAction: 'manipulation' }}
          >
            {status === 'connecting' || status === 'creating' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Bağlanılıyor...
              </span>
            ) : (
              '⚔️ Odaya Katıl'
            )}
          </button>
        </div>

        <p className="text-center text-[10px] text-emerald-200/40 sm:text-xs">
          💡 Davet linki açtıysan kod otomatik dolar
        </p>
      </div>
    </div>
  );
}
