import { useEffect, useState } from 'react';
import { PieceIcon } from './pieces';
import { CAMPAIGNS } from './campaigns';
import type { Piece } from './types';

interface LandingPageProps {
  onPlay: () => void;
  onOnline: () => void;
}

export function LandingPage({ onPlay, onOnline }: LandingPageProps) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const wKing: Piece = { type: 'king', color: 'white' };
  const bKing: Piece = { type: 'king', color: 'black' };
  const wKnight: Piece = { type: 'knight', color: 'white' };
  const bKnight: Piece = { type: 'knight', color: 'black' };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-stone-950 text-amber-50">
      {/* ═══════════ NAVBAR ═══════════ */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-amber-800/40 bg-stone-950/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-lg font-black tracking-tight sm:text-xl"
          >
            <span className="text-2xl">♛</span>
            <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Türk Tarihi Satrancı
            </span>
          </button>
          <div className="hidden items-center gap-6 text-sm font-semibold text-amber-100/80 md:flex">
            <button onClick={() => scrollTo('features')} className="transition hover:text-amber-300">
              Özellikler
            </button>
            <button onClick={() => scrollTo('battles')} className="transition hover:text-amber-300">
              Savaşlar
            </button>
            <button onClick={() => scrollTo('how')} className="transition hover:text-amber-300">
              Nasıl Oynanır
            </button>
            <button onClick={() => scrollTo('about')} className="transition hover:text-amber-300">
              Hakkında
            </button>
          </div>
          <button
            onClick={onPlay}
            className="rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 px-4 py-2 text-sm font-bold text-amber-50 shadow-lg transition active:scale-95 hover:from-amber-400 hover:to-amber-600 sm:px-5"
          >
            ⚔ Oyna
          </button>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:px-6"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(180, 83, 9, 0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 78, 59, 0.3), transparent 50%), linear-gradient(135deg, #1c1917, #292524, #0c0a09)',
        }}
      >
        {/* Dekoratif çizgiler */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(217, 119, 6, 0.1) 60px, rgba(217, 119, 6, 0.1) 120px)',
          }}
        />
        {/* Yüzen taşlar */}
        <div className="pointer-events-none absolute left-[8%] top-[25%] hidden h-20 w-20 opacity-30 lg:block" style={{ animation: 'floaty 6s ease-in-out infinite' }}>
          <PieceIcon piece={wKnight} size={80} />
        </div>
        <div className="pointer-events-none absolute right-[8%] top-[30%] hidden h-20 w-20 opacity-30 lg:block" style={{ animation: 'floaty 7s ease-in-out infinite', animationDelay: '1s' }}>
          <PieceIcon piece={bKnight} size={80} />
        </div>

        <style>{`
          @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-25px) rotate(5deg); } }
          @keyframes heroIn { from { opacity:0; transform: translateY(30px);} to {opacity:1; transform:translateY(0);} }
          @keyframes glowPulse { 0%,100% { text-shadow: 0 0 20px rgba(251,191,36,0.3);} 50% { text-shadow: 0 0 40px rgba(251,191,36,0.6);} }
          .hero-in { animation: heroIn 0.9s ease-out both; }
        `}</style>

        <div className={`relative z-10 max-w-3xl text-center ${mounted ? 'hero-in' : 'opacity-0'}`}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-700/50 bg-amber-950/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-300 sm:text-xs">
            ♔ 1402 · Ankara — 1514 · Çaldıran ♔
          </div>
          <h1
            className="bg-gradient-to-br from-amber-100 via-amber-400 to-amber-700 bg-clip-text text-4xl font-black leading-tight tracking-tight text-transparent sm:text-6xl md:text-7xl"
            style={{ animation: 'glowPulse 3s ease-in-out infinite' }}
          >
            TÜRK TARİHİ<br />SATRANCI
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-amber-100/80 sm:text-lg">
            Osmanlı'nın efsanevi savaşlarını satranç tahtasında yeniden yaşa.
            Yapay zekâya karşı savaş, arkadaşınla çevrimiçi oyna, tarihe yön ver.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={onPlay}
              className="group relative w-full overflow-hidden rounded-xl border-2 border-amber-400 bg-gradient-to-br from-amber-500 to-amber-700 px-8 py-4 text-lg font-black tracking-wide text-amber-50 shadow-2xl shadow-amber-500/40 transition active:scale-95 hover:shadow-amber-400/60 sm:w-auto"
            >
              <span className="relative z-10">⚔ HEMEN OYNA</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </button>
            <button
              onClick={onOnline}
              className="w-full rounded-xl border-2 border-blue-400/60 bg-blue-950/40 px-8 py-4 text-lg font-bold tracking-wide text-blue-100 backdrop-blur transition active:scale-95 hover:border-blue-400 hover:bg-blue-900/40 sm:w-auto"
            >
              🌍 Çevrimiçi Oyna
            </button>
          </div>
          <p className="mt-6 text-xs text-amber-200/50">
            Ücretsiz · Kayıt gerektirmez · Tarayıcıda çalışır
          </p>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('features')}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-amber-400/60 transition hover:text-amber-300"
          style={{ animation: 'floaty 2s ease-in-out infinite' }}
          aria-label="Aşağı kaydır"
        >
          ▼
        </button>
      </section>

      {/* ═══════════ FEATURES ═══════════ */}
      <section id="features" className="border-t border-amber-900/30 bg-stone-900 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-amber-100 sm:text-4xl">Neden Bu Oyun?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-amber-100/60">
              Klasik satrancı Türk tarihiyle buluşturan, benzersiz bir strateji deneyimi
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '🏰', title: 'Tarihi Savaşlar', desc: 'Ankara 1402 ve Çaldıran 1514 muharebelerini tahtada canlandır. Her taş bir tarihi figür.' },
              { icon: '🤖', title: 'Akıllı Yapay Zekâ', desc: '3 zorluk seviyesi. Minimax algoritmasıyla güçlü rakip. Kolay, orta veya usta seviyesi seç.' },
              { icon: '🌍', title: 'Çevrimiçi Multiplayer', desc: 'Arkadaşınla dünyanın her yerinden oyna. Davet linki paylaş, anında bağlan.' },
              { icon: '♟️', title: 'Tam Satranç Kuralları', desc: 'Rok, geçerken alma, terfi, şah-mat — tüm FIDE kuralları eksiksiz uygulanır.' },
              { icon: '📱', title: 'Her Cihazda', desc: 'Telefon, tablet, bilgisayar. Kurulum yok, tarayıcıda anında çalışır.' },
              { icon: '🎨', title: 'Özgün Tasarım', desc: 'El çizimi tarihi taşlar, Osmanlı sarayı estetiği, akıcı animasyonlar.' },
            ].map((f, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-amber-900/40 bg-gradient-to-br from-stone-800/80 to-stone-900/80 p-6 shadow-lg transition hover:border-amber-600/60 hover:shadow-amber-900/30"
              >
                <div className="mb-3 text-4xl transition group-hover:scale-110">{f.icon}</div>
                <h3 className="mb-2 text-lg font-bold text-amber-200">{f.title}</h3>
                <p className="text-sm text-amber-100/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BATTLES ═══════════ */}
      <section id="battles" className="bg-stone-950 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-amber-100 sm:text-4xl">Tarihi Meydanlar</h2>
            <p className="mx-auto mt-3 max-w-2xl text-amber-100/60">
              İki büyük muharebe, iki farklı çağ. Hangisinde zafer senin olacak?
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {Object.values(CAMPAIGNS).map((c) => (
              <div
                key={c.id}
                className={`relative overflow-hidden rounded-2xl border-2 bg-gradient-to-br ${c.bgGradient} p-6 shadow-2xl sm:p-8 ${
                  c.id === 'ankara1402' ? 'border-amber-700/50' : 'border-red-700/50'
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full border border-amber-500/60 bg-amber-950/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
                    {c.year}
                  </span>
                  <span className="text-xs text-amber-200/60">📍 {c.location}</span>
                </div>
                <h3 className="mb-2 text-2xl font-black text-amber-100 sm:text-3xl">{c.name}</h3>
                <p className="mb-5 text-sm italic text-amber-200/70">"{c.tagline}"</p>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12"><PieceIcon piece={wKing} size={48} /></div>
                    <div className="text-xs">
                      <div className="font-bold text-emerald-300">Osmanlı</div>
                      <div className="text-amber-100/70">{c.osmanliRulerTitle}</div>
                    </div>
                  </div>
                  <span className="text-xl text-amber-400">⚔</span>
                  <div className="flex items-center gap-2">
                    <div className="text-right text-xs">
                      <div className="font-bold text-red-300">{c.enemyName}</div>
                      <div className="text-amber-100/70">{c.enemyRulerTitle}</div>
                    </div>
                    <div className="h-12 w-12"><PieceIcon piece={bKing} size={48} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={onPlay}
              className="rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 px-8 py-3.5 text-base font-black text-amber-50 shadow-xl transition active:scale-95 hover:from-amber-400 hover:to-amber-600"
            >
              ⚔ Savaşa Katıl
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW TO PLAY ═══════════ */}
      <section id="how" className="border-t border-amber-900/30 bg-stone-900 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-amber-100 sm:text-4xl">Nasıl Oynanır?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-amber-100/60">
              Üç basit adımda savaşa başla
            </p>
          </div>
          <div className="space-y-6">
            {[
              { n: '1', title: 'Savaşını Seç', desc: 'Ankara 1402 veya Çaldıran 1514 muharebesini seç. Ardından yapay zekâya karşı mı, arkadaşınla mı yoksa çevrimiçi mi oynayacağını belirle.' },
              { n: '2', title: 'Taşını Oynat', desc: 'Bir taşına dokun — yeşil noktalar yasal hamleleri gösterir. Hedef kareye dokunarak hamleni yap. Tüm satranç kuralları geçerli.' },
              { n: '3', title: 'Şah-Mat Et', desc: 'Rakibin şahını köşeye sıkıştır. Stratejini kur, tuzağını hazırla ve zaferi kazan. Tarihe adını yaz!' },
            ].map((s) => (
              <div key={s.n} className="flex gap-4 rounded-2xl border border-amber-900/40 bg-stone-800/60 p-5 sm:gap-6 sm:p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-xl font-black text-amber-50 shadow-lg sm:h-14 sm:w-14 sm:text-2xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-amber-200 sm:text-xl">{s.title}</h3>
                  <p className="text-sm text-amber-100/60 sm:text-base">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="bg-stone-950 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-amber-100 sm:text-4xl">Hakkında</h2>
          <p className="mx-auto mt-5 max-w-2xl text-amber-100/70 sm:text-lg">
            <span className="font-bold text-amber-300">Türk Tarihi Satrancı</span>, klasik satranç
            oyununu Türk tarihinin dönüm noktalarıyla birleştiren, eğitici ve eğlenceli bir strateji
            oyunudur. Her taş, tarihi bir askeri sınıfı temsil eder: Yeniçeriler, Sipahiler, Akıncılar...
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-amber-100/60">
            Amacımız, satranç sevgisini ve tarih bilincini bir araya getirmek. Oyun tamamen ücretsizdir,
            kayıt gerektirmez ve hiçbir kişisel veri toplamaz.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { num: '2', label: 'Tarihi Savaş' },
              { num: '3', label: 'Zorluk Seviyesi' },
              { num: '∞', label: 'Çevrimiçi Maç' },
              { num: '100%', label: 'Ücretsiz' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-amber-900/40 bg-stone-900/60 p-5">
                <div className="bg-gradient-to-br from-amber-300 to-amber-600 bg-clip-text text-3xl font-black text-transparent sm:text-4xl">
                  {s.num}
                </div>
                <div className="mt-1 text-xs text-amber-100/60 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="relative overflow-hidden border-y border-amber-800/40 py-16 sm:py-20"
        style={{ backgroundImage: 'linear-gradient(135deg, #451a03, #1c1917, #064e3b)' }}
      >
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-black text-amber-100 sm:text-5xl">Savaş Seni Bekliyor</h2>
          <p className="mx-auto mt-4 max-w-xl text-amber-100/70 sm:text-lg">
            Tahtaya otur, ordunu kur ve tarihe adını yaz. Zafer cesur olanındır.
          </p>
          <button
            onClick={onPlay}
            className="group relative mt-8 overflow-hidden rounded-xl border-2 border-amber-400 bg-gradient-to-br from-amber-500 to-amber-700 px-12 py-4 text-xl font-black tracking-wide text-amber-50 shadow-2xl shadow-amber-500/40 transition active:scale-95 hover:shadow-amber-400/60"
          >
            <span className="relative z-10">⚔ OYUNA BAŞLA</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-stone-950 py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-lg font-black">
              <span className="text-2xl">♛</span>
              <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
                Türk Tarihi Satrancı
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-amber-100/60">
              <button onClick={() => scrollTo('features')} className="transition hover:text-amber-300">Özellikler</button>
              <button onClick={() => scrollTo('battles')} className="transition hover:text-amber-300">Savaşlar</button>
              <button onClick={() => scrollTo('how')} className="transition hover:text-amber-300">Nasıl Oynanır</button>
              <button onClick={() => scrollTo('about')} className="transition hover:text-amber-300">Hakkında</button>
            </div>
            <button
              onClick={onPlay}
              className="rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 px-5 py-2 text-sm font-bold text-amber-50 shadow-lg transition active:scale-95 hover:from-amber-400 hover:to-amber-600"
            >
              ⚔ Oyna
            </button>
          </div>
          <div className="mt-8 border-t border-amber-900/30 pt-6 text-center text-xs text-amber-200/40">
            <p>© 2026 Türk Tarihi Satrancı · Tüm hakları saklıdır</p>
            <p className="mt-1">Eğitim amaçlı yapılmıştır · Tarihi figürler kamu malıdır</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
