import { useEffect, useState } from 'react';
import { onlineService } from '../network/online';

interface InviteHostScreenProps {
  onConnected: () => void;
  onBack: () => void;
}

export function InviteHostScreen({ onConnected, onBack }: InviteHostScreenProps) {
  const [error, setError] = useState<string | null>(null);
  const [roomCode, setRoomCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const inviteUrl =
    typeof window !== 'undefined' && roomCode
      ? `${window.location.origin}${window.location.pathname}?room=${roomCode}`
      : '';

  useEffect(() => {
    // onlineService.on çağrısı event listener pattern'i; cleanup için
    const off = onlineService.on('status', () => {});
    void off;
    onlineService.setCallbacks({
      onPeerJoined: () => onConnected(),
      onError: (msg) => setError(msg),
    });
    onlineService.hostRoom().then(setRoomCode).catch(() => {});
  }, [onConnected]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = inviteUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-amber-950/30 to-stone-950" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={handleCancel}
          className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-stone-800/70 px-3 py-1.5 text-xs text-amber-200 backdrop-blur transition active:scale-95 hover:bg-stone-700 sm:text-sm"
          style={{ touchAction: 'manipulation' }}
        >
          ← İptal
        </button>

        {error ? (
          <div className="rounded-2xl border-2 border-red-500/50 bg-red-950/40 p-6 text-center backdrop-blur">
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
            <div className="mb-4 text-center sm:mb-6">
              <div className="mb-1 flex items-center justify-center gap-2 text-amber-300/80">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500 sm:w-16" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs sm:tracking-[0.3em]">
                  🏰 Oda Kur
                </span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500 sm:w-16" />
              </div>
              <h1 className="bg-gradient-to-br from-amber-200 via-amber-400 to-amber-700 bg-clip-text text-2xl font-black tracking-tight text-transparent drop-shadow-2xl sm:text-3xl">
                ODA OLUŞTURULDU
              </h1>
            </div>

            {/* Room code */}
            <div className="mb-3 rounded-2xl border-2 border-amber-500/50 bg-stone-900/70 p-4 shadow-2xl backdrop-blur sm:mb-4 sm:p-5">
              <p className="text-center text-[10px] font-bold uppercase tracking-widest text-amber-300/80 sm:text-xs">
                Oda Kodu
              </p>
              <p className="mt-1 text-center font-mono text-3xl font-black tracking-widest text-amber-100 sm:text-4xl">
                {roomCode || '...'}
              </p>
              <button
                onClick={handleCopy}
                disabled={!roomCode}
                className="mt-2 w-full rounded-lg bg-amber-700 px-3 py-2 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-amber-600 disabled:opacity-50 sm:mt-3 sm:text-sm"
                style={{ touchAction: 'manipulation' }}
              >
                {copied ? '✓ Kopyalandı' : '📋 Kodu Kopyala'}
              </button>
            </div>

            {/* Link */}
            <div className="mb-4 rounded-2xl border-2 border-amber-700/40 bg-stone-900/60 p-3 shadow-xl backdrop-blur sm:mb-6 sm:p-4">
              <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-widest text-amber-300/80 sm:text-xs">
                Veya Davet Linki
              </p>
              <div className="break-all rounded-lg border border-amber-700/30 bg-stone-950/60 p-2 text-center font-mono text-[10px] text-amber-100 sm:p-3 sm:text-[11px]">
                {inviteUrl || '...'}
              </div>
              <button
                onClick={handleCopy}
                disabled={!inviteUrl}
                className="mt-2 w-full rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white shadow transition active:scale-95 hover:bg-amber-500 disabled:opacity-50 sm:mt-3 sm:text-sm"
                style={{ touchAction: 'manipulation' }}
              >
                {copied ? '✓ Link Kopyalandı' : '🔗 Linki Kopyala'}
              </button>
            </div>

            {/* Waiting */}
            <div className="rounded-2xl border-2 border-amber-700/40 bg-stone-900/60 p-4 text-center backdrop-blur sm:p-5">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center sm:mb-3 sm:h-12 sm:w-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-500/30 border-t-amber-400 sm:h-10 sm:w-10" />
              </div>
              <p className="text-sm font-bold text-amber-100 sm:text-base">
                Rakip bekleniyor...
              </p>
              <p className="mt-1 text-[10px] text-amber-200/60 sm:text-xs">
                Kodu veya linki paylaştığında oyun otomatik başlar
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
