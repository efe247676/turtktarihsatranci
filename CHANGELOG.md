# 📜 Sürüm Notları — Osmanlı Satrancı

Tüm önemli değişiklikler kronolojik sırayla bu dosyada belgelenmiştir.

Versiyonlama: [Semantic Versioning](https://semver.org/) — `MAJOR.MINOR.PATCH`

---

## [1.0.0] — 2026-XX-XX — İlk Yayın 🎉

### ✨ Yeni Özellikler

#### 🎮 Oyun Çekirdeği
- **Tam fonksiyonel satranç motoru** — Tüm taş türleri (piyon, kale, at, fil, vezir, şah)
- **Tüm FIDE kuralları**:
  - ✅ Rok (kısa ve uzun) — şah ve kale hareket etmemiş olmalı, aradaki kareler boş, geçiş kareleri saldırı altında olmamalı
  - ✅ Geçerken alma (en passant)
  - ✅ Terfi (piyon son sıraya geldiğinde vezir/kale/fil/attan birini seçme)
  - ✅ Şah, şah-mat, pat durumu tespiti
  - ✅ Sadece yasal hamleler (kendi şahınızı tehlikeye atan hamleler otomatik engellenir)
- **Yapay zekâ (AI)** — Minimax + alpha-beta budama algoritması
  - 3 zorluk seviyesi: Kolay (2 hamle derinlik), Orta (3), Zor (4)
  - Taş değerleri + pozisyon tabloları (pawn/knight/bishop/rook/queen/king)
  - Hızlı yanıt süresi (350ms)

#### 🏰 İki Tarihi Savaş Senaryosu
- **🟢 Ankara Muharebesi 1402** — Sultan Bayezid Han vs Emir Timur
  - Osmanlı taşları: Yeniçeri, Sipahi, Akıncı, Vezir, Sadrazam, Bayezid
  - Timurlu taşları: Mirza, Tümen Komutanı, Bahadır, Vezir-i Azam, Emirü'l-Ümera, Timur
- **🔴 Çaldıran Muharebesi 1514** — Yavuz Sultan Selim vs Şah İsmail
  - Osmanlı taşları: Yeniçeri, Sipahi, Akıncı, Vezir, Sadrazam, Yavuz
  - Safevi taşları: Kızılbaş, Süvari Beyi, Ezhere, Mürşid, Vekil-i Saltanat, Şah İsmail
- Her savaş için özel:
  - Savaş hikâyesi (5 satır tarihçe)
  - Hükümdar sloganları
  - Tema renkleri (Osmanlı yeşil, rakip kırmızı)
  - Arka plan gradyanı

#### 🎨 Görsel Tasarım
- **El çizimi SVG taşlar** — Her taş türü özgün, tarihi figürleri temsil eden detaylı tasarım
  - Yeniçeri/Mirza: miğferli asker + mızrak
  - Sipahi/Tümen Komutanı: kule + hilal
  - Akıncı/Bahadır: at başı + yele
  - Vezir: mitre + tughra
  - Sadrazam/Emirü'l-Ümera: taçlı vezir
  - Bayezid/Yavuz/Timur/Şah İsmail: taçlı şah
- **Animasyonlu arka plan**:
  - Dövüş alanı dokusu (45° çizgili)
  - Yüzen sis/toz parçacıkları
  - Merkez ışık efekti
- **Lokum/Bok easter egg** 🍬💩 (sadece Çaldıran savaşında):
  - Kazanan taraf → parlak pembe Lokum (taçlı, gülümseyen, parıltılı)
  - Kaybeden taraf → Bok (sinekli, dumanlı, üzgün yüzlü)
  - SVG animasyonları (zıplama, kaybolma, sparkle)

#### 🖥️ Arayüz (UI/UX)
- **Çoklu ekran yapısı** (4 aşamalı akış):
  - Ana Menü (başlık + önizleme kartları)
  - Savaş Seçimi (2 savaş kartı)
  - Savaş Özeti (hükümdarlar + tarih + mod seçimi)
  - Oyun Tahtası
- **3 oyun modu**:
  - 🤖 AI'ya karşı (3 zorluk)
  - 👥 İki kişilik aynı cihazda
  - 🌍 Çevrimiçi (P2P çok oyunculu)
- **Tema renkleri**:
  - **Osmanlı: Yeşil** 🟢 (İslam bayrağı, hilal)
  - **Rakipler: Kırmızı** 🔴 (Kızılbaş teması, Timur/Safevi)
- **Türkçe arayüz** — tüm metinler, hata mesajları, geri bildirimler Türkçe
- **Akıllı UI bileşenleri**:
  - Son hamle vurgulama (mavi ring)
  - Yasal hamle daireleri (yeşil noktalar)
  - Şah tehdit altındayken kırmızı yanıp sönen uyarı
  - Hamle geçmişi paneli (taş isimleri + kare notasyonu)
  - Tahtayı çevirme (Beyaz/Siyah bakış açısı)
  - Taş isim hover'ları, ipucu metinleri

#### 🌍 Çevrimiçi Multiplayer (PeerJS P2P)
- **Hızlı Eşleşme** (matchmaking) — Kuyruğa gir, rakip gelince otomatik başla
- **Oda Oluştur** (host) — 6 haneli kod + davet linki, kopyalama butonları
- **Kod ile Katıl** (guest) — Input alanı, Enter ile katılma
- **URL routing** — `?room=ABC123` ile sayfa açıldığında otomatik odaya katıl
- **Hamle senkronizasyonu** — Her hamle anlık olarak peer'a gönderilir
- **Sıra kısıtlaması** — Sadece kendi sıran olduğunda hamle yapabilirsin
- **Bağlantı yönetimi**:
  - Bağlantı koparsa hata toast'ı
  - "🚪 Ayrıl" butonu ile güvenli çıkış
  - Sıfırlama her iki tarafta senkronize
- **Düşük gecikme** — Sunucu yok, P2P bağlantı
- **Hata yönetimi**:
  - Oda bulunamadı
  - Ağ hatası
  - Zaman aşımı
  - Otomatik yeniden deneme (unavailable-id)

#### 📱 Mobil Optimizasyon
- **Tam responsive tasarım**:
  - Mobil (≤640px): Tek kolon, akordion paneller
  - Tablet (640-1024px): Orta boyut
  - Desktop (≥1024px): 3 kolon düzeni
- **Viewport meta etiketleri**:
  - `maximum-scale=1.0, user-scalable=no` (pinç-zoom engelleme)
  - `viewport-fit=cover` (iPhone çentik desteği)
  - `apple-mobile-web-app-capable` (PWA)
- **Safe area desteği** — `env(safe-area-inset-top/bottom)` ile çentik uyumu
- **Dokunmatik optimizasyon**:
  - `touch-action: manipulation` (çift-tap zoom engelleme)
  - `-webkit-tap-highlight-color: transparent`
  - `overscroll-behavior: none` (rubber-band engelleme)
  - Minimum 44px dokunma alanı (Apple HIG)
  - `active:scale-95` buton geri bildirimi
- **Akıllı ekran düzeni**:
  - Tahta her zaman viewport'a sığar (96vw max)
  - Yan paneller mobilde collapsible (akordion)
  - Promotion dialog mobilde bottom-sheet
  - Buton etiketleri kısaltıldı (mobil: "🤖 AI", desktop: "🤖 AI: Açık")

#### 💰 Monetizasyon (AdMob)
- **Banner reklam entegrasyonu**:
  - App ID: `ca-app-pub-3328238647509751~6498293452`
  - Banner Ad Unit: `ca-app-pub-3328238647509751/3841044792`
  - `@capacitor-community/admob` paketi
- **Akıllı banner stratejisi**:
  - ✅ Menü ve lobby ekranlarında gösterilir
  - ❌ Oyun sırasında gizlenir (odak için)
  - 400ms gecikme ile akıcı geçiş
- **Web'de no-op** — Sadece native platformda çalışır

#### 📦 Capacitor AAB Build Altyapısı
- **Android App Bundle (AAB) üretimi** için tam altyapı:
  - `capacitor.config.ts` (appId: `com.osmanli.satranc`)
  - `scripts/build-aab.sh` (release AAB)
  - `scripts/build-aab-debug.sh` (debug AAB)
  - `npm run aab:debug` / `npm run aab:release` script'leri
- **Singlefile build** — Tüm JS/CSS `dist/index.html`'e gömülü (~475KB)
- **Keystore rehberi** — `BUILD_AAB.md` dosyasında
- **Play Store yayın içerikleri** — `PLAY_STORE.md` (TR + EN, ASO optimize)

### 🔧 Teknik Altyapı

#### Mimari
- **React 19.2** + **TypeScript 5.9** + **Vite 7.3**
- **Tailwind CSS 4.1** — Utility-first styling
- **vite-plugin-singlefile** — Tek dosya build
- **PeerJS 1.5** — P2P bağlantı
- **@capacitor/core, /cli, /android** — Native shell
- **@capacitor-community/admob** — Reklam SDK

#### Dosya Yapısı
```
src/
├── App.tsx                          # Ana uygulama, ekran yönetimi
├── main.tsx                         # React entry
├── index.css                        # Global stiller
├── chess/
│   ├── types.ts                     # Tip tanımları
│   ├── logic.ts                     # Satranç motoru (hamle kuralları, şah-mat tespiti)
│   ├── ai.ts                        # Minimax AI
│   ├── pieces.tsx                   # SVG taş bileşenleri
│   ├── campaigns.ts                 # Savaş senaryoları (Ankara, Çaldıran)
│   ├── EasterEgg.tsx                # Lokum & Bok SVG'leri
│   ├── Board.tsx                    # Tahta bileşeni
│   ├── StartScreen.tsx              # Ana menü
│   ├── BattleSelectScreen.tsx       # Savaş seçimi
│   ├── BattleIntroScreen.tsx        # Savaş özeti
│   ├── OnlineMenu.tsx               # Çevrimiçi mod seçimi
│   ├── MatchmakingScreen.tsx        # Eşleşme kuyruğu
│   ├── InviteHostScreen.tsx         # Oda oluştur
│   └── InviteGuestScreen.tsx        # Odaya katıl
├── hooks/
│   └── useMediaQuery.ts             # Responsive hook
├── network/
│   ├── online.ts                    # PeerJS P2P servisi
│   └── admob.ts                     # AdMob reklam servisi
└── utils/
    └── cn.ts                        # Tailwind class birleştirici
```

#### Performans
- **Bundle boyutu**: ~475 KB (gzip: ~123 KB)
- **İlk yükleme**: <2 saniye (3G)
- **AI düşünme süresi**: 350ms (ortalama)
- **P2P bağlantı süresi**: <3 saniye

### 📚 Dokümantasyon
- `BUILD_AAB.md` — Android AAB build rehberi (JDK, SDK, keystore, Play Store)
- `PLAY_STORE.md` — Google Play Store yayın içerikleri (TR + EN, ASO, ekran görüntüsü altyazıları)
- `MONETIZATION.md` — Para kazanma analizi (4 senaryo, 30 günlük yol haritası, vergi rehberi)
- `ADMOB_INTEGRATION.md` — AdMob entegrasyon detayları

### 🐛 Bilinen Sınırlamalar
- iOS sürümü yok (sadece Android)
- Sadece Türkçe ve İngilizce (Çince, Arapça, Farsça için lokalizasyon altyapısı hazır)
- Çevrimiçi matchmaking basit (gerçek sıralama yok)
- AI'ya karşı oyunda terfi dialog'unda sadece beyaz taşlar için otomatik vezir (siyah taşlar için normal dialog)

### 🔜 Gelecek Sürümler (Plan)
- **v1.1.0**: Yeni savaş senaryoları (Mohaç 1526, İstanbul'un Fethi 1453, Preveze 1538)
- **v1.2.0**: iOS sürümü (App Store)
- **v1.3.0**: Çoklu dil (Arapça, Farsça, Almanca)
- **v2.0.0**: Sıralı eşleşme (ELO), turnuvalar, liderlik tablosu
- **v2.1.0**: Abonelik modeli (Pro), reklamsız deneyim
- **v2.2.0**: Eğitim modu (yeni başlayanlar için dersler, bulmaca)

---

## 🏷️ Sürüm Etiketleri

- 🎉 İlk yayın
- ✨ Yeni özellik
- 🐛 Hata düzeltmesi
- 🎨 Tasarım/UI
- ⚡ Performans
- 📚 Dokümantasyon
- 🔧 Teknik altyapı
- 💰 Monetizasyon
- 🌍 Çevrimiçi
- ♟️ Satranç motoru
- 📱 Mobil
- 🏰 Tarihi içerik

---

## 📞 Geri Bildirim

Hata bildirimi veya öneri için:
- GitHub Issues (açılacak)
- E-posta: support@example.com
- Web: https://example.com/support

---

**Son güncelleme:** 2026
**Mevcut sürüm:** 1.0.0
**Toplam geliştirme süresi:** ~X saat
**Kod satır sayısı:** ~3500+ satır TypeScript/TSX
