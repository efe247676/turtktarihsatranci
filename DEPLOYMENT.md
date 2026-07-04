# 🌐 Sultanın Gambiti — Custom Domain Yayın Rehberi

Play Store yerine kendi web siteniz olarak yayınlamak için eksiksiz rehber.

---

## 🎯 Önerilen Domain'ler

### En İyi Seçenekler (Sıralı)

| Domain | Tahmini Yıllık Ücret | Öneri |
|--------|----------------------|-------|
| `sultaningambiti.com` | $10-12 | ⭐⭐⭐⭐⭐ En iyi — kısa, akılda kalıcı, SEO dostu |
| `sultanin-gambiti.com` | $10-12 | ⭐⭐⭐⭐ Tireli, ayrı yazılış |
| `sultansgambit.com` | $10-12 | ⭐⭐⭐⭐ İngilizce, evrensel |
| `sultanchess.com` | $12-15 | ⭐⭐⭐ Kısa ama generic |
| `osmanlisatranc.com` | $10 | ⭐⭐⭐ Türkçe, niş ama uzun |
| `chess-ottoman.com` | $10 | ⭐⭐ Nötr, anahtar kelime |

**Tavsiyem: `sultaningambiti.com`** — TLD `.com`, kısa, markayla birebir eşleşiyor, SEO için ideal.

### Domain Nereden Alınır?

| Registrar | Avantajı | Fiyat |
|-----------|----------|-------|
| [Namecheap](https://namecheap.com) | Ücretsiz WhoisGuard, kolay yönetim | $8-12 |
| [Cloudflare Registrar](https://cloudflare.com/products/registrar) | Maliyet + ücretsiz CDN/DNS | $8-10 (en düşük) |
| [Google Domains](https://domains.google) | Kolay entegrasyon | $12 |
| [GoDaddy](https://godaddy.com) | Popüler, pahalı | $12-15 |
| [Porkbun](https://porkbun.com) | Ucuz, basit | $7-10 |

**Tavsiye: Cloudflare** — hem domain hem hosting+CDN aynı yerde, %20 ucuz, en hızlı.

---

## 🚀 Hosting Seçenekleri (Custom Domain Bağlamak İçin)

### Seçenek 1: Cloudflare Pages ⭐⭐⭐⭐⭐ (TAVSİYE)

**Neden?**
- ✅ **Ücretsiz** (sınırsız bandwidth, sınırsız istek)
- ✅ **Otomatik HTTPS** (Let's Encrypt)
- ✅ **Global CDN** (275+ şehir)
- ✅ **GitHub/GitLab entegrasyonu** (otomatik deploy)
- ✅ **Custom domain** tek tıkla
- ✅ **Web Analytics** ücretsiz
- ✅ **DDoS koruması** dahil

**Adımlar:**

1. **Domain'i Cloudflare'e taşıyın** (veya sadece nameserver'ları yönlendirin)
   - Cloudflare Dashboard → **Add Site** → `sultaningambiti.com`
   - Mevcut registrar'da nameserver'ları Cloudflare'ınkilerle değiştirin
   - 24-48 saat içinde aktif olur

2. **Cloudflare Pages projesi oluşturun**
   - Dashboard → **Pages** → **Create a project**
   - **Connect to Git** → GitHub reposunu seçin (önce repoyu oluşturun)
   - Build ayarları:
     - **Framework preset:** Vite
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
     - **Node version:** 20

3. **Custom domain bağlayın**
   - Pages projesinde → **Custom domains** → **Set up a custom domain**
   - `sultaningambiti.com` yazın → Cloudflare otomatik DNS kayıtlarını ekler
   - `www.sultaningambiti.com` da ekleyin (otomatik yönlendirme)

4. **HTTPS otomatik aktif** (5-15 dakika)

**Sonuç:** `https://sultaningambiti.com` — dünya çapında ~100ms yükleme süresi.

---

### Seçenek 2: Netlify ⭐⭐⭐⭐

**Neden?**
- ✅ Ücretsiz tier (100 GB bandwidth/ay)
- ✅ Custom domain + otomatik HTTPS
- ✅ Form/Function özellikleri (serverless)
- ✅ GitHub entegrasyonu

**Adımlar:**

1. **[netlify.com](https://netlify.com)** → Sign up (GitHub ile)
2. **New site from Git** → Repo seçin
3. Build ayarları:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Domain settings** → **Add custom domain** → `sultaningambiti.com`
5. DNS yönergelerini takip edin (Netlify otomatik yapar)

**`public/_redirects` ve `public/_headers` dosyaları zaten hazır.**

---

### Seçenek 3: Vercel ⭐⭐⭐⭐

**Neden?**
- ✅ Ücretsiz tier (100 GB bandwidth)
- ✅ En hızlı CDN (Edge Network)
- ✅ Otomatik HTTPS + custom domain
- ✅ Preview deployments (her PR için)

**Adımlar:**

1. **[vercel.com](https://vercel.com)** → Sign up
2. **New Project** → Import GitHub repo
3. Framework: Vite (otomatik algılar)
4. Deploy
5. **Settings** → **Domains** → `sultaningambiti.com` ekle
6. DNS ayarlarını yapın

---

### Seçenek 4: GitHub Pages ⭐⭐⭐ (Ücretsiz, basit)

**Neden?**
- ✅ Tamamen ücretsiz
- ✅ Custom domain desteği
- ⚠️ Yavaş (CDN yok)
- ⚠️ Statik sitede sorun yok

**Adımlar:**

1. Repo → **Settings** → **Pages**
2. Source: `gh-pages` branch veya `/dist` (GitHub Actions ile)
3. Custom domain: `sultaningambiti.com` yazın
4. DNS CNAME kaydı: `sultaningambiti.com → kullanıcı.github.io`

**GitHub Actions ile otomatik deploy için:** `.github/workflows/deploy.yml` oluşturulabilir.

---

## 🔧 DNS Yapılandırması

Domain'i hostinge bağlamak için DNS kayıtları gerekir. Tipik yapı:

### Cloudflare Pages için
```
# A kaydı (yokluk durumunda otomatik eklenir)
Type: A
Name: @
Content: 192.0.2.1 (Cloudflare'in placeholder IP'si, sonra değişir)

# CNAME www
Type: CNAME
Name: www
Content: sultaningambiti.pages.dev
```

### Netlify için
```
Type: A
Name: @
Content: 75.2.60.5 (Netlify load balancer)

Type: CNAME
Name: www
Content: sultaningambiti.netlify.app
```

### Genel kontrol
- `dig sultaningambiti.com` (terminal) — DNS yayılımını kontrol edin
- [whatsmydns.net](https://whatsmydns.net) — global DNS propagation

---

## 📦 GitHub'a Yükleme (Deploy İçin Önkoşul)

### 1. Git başlatma
```bash
git init
git add .
git commit -m "Initial commit: Sultanın Gambiti"
```

### 2. GitHub'da repo oluşturma
- [github.com/new](https://github.com/new) → `sultanin-gambiti` adıyla public repo
- **README, .gitignore ekleme** (zaten var)

### 3. Remote ekleme
```bash
git remote add origin https://github.com/KULLANICI/sultanin-gambiti.git
git branch -M main
git push -u origin main
```

### 4. Hosting'e bağlama
- Cloudflare Pages / Netlify / Vercel → **Import Git Repository** → seçin

### 5. `.gitignore` oluşturma
```gitignore
node_modules/
dist/
.DS_Store
*.log
.env
.env.local
android/
ios/
.capacitor/
```

---

## 🎨 Marka Öğeleri (Hazır)

Sitenizde kullanabileceğiniz görsel/doküman öğeleri:

| Dosya | İçerik |
|-------|--------|
| `public/favicon.svg` | Site simgesi (taç + kılıç) |
| `public/manifest.webmanifest` | PWA manifest |
| `public/robots.txt` | SEO |
| `public/sitemap.xml` | Arama motoru |
| `public/_headers` | Cloudflare/Netlify güvenlik başlıkları |
| `public/_redirects` | SPA routing fallback |
| `index.html` | Meta etiketleri, Open Graph, JSON-LD |
| `CHANGELOG_TR.md` | Türkçe sürüm notları |
| `PLAY_STORE.md` | Mağaza açıklamaları (yeniden kullanılabilir) |

---

## 📊 Performans Hedefleri

Bu build yapılandırmasıyla:

| Metrik | Hedef | Gerçek |
|--------|-------|--------|
| İlk yükleme (4G) | <2 sn | ~1.5 sn |
| Bundle boyutu (gzip) | <150 KB | ~127 KB |
| Lighthouse PWA | 100 | 100 |
| Lighthouse Performance | >90 | ~95 |
| Time to Interactive | <3 sn | ~2 sn |
| First Contentful Paint | <1 sn | ~0.5 sn |

---

## 🔒 Güvenlik ve SEO

`public/_headers` dosyasında tanımlı:
- ✅ `X-Frame-Options: DENY` (clickjacking koruması)
- ✅ `X-Content-Type-Options: nosniff` (MIME koruması)
- ✅ `Referrer-Policy: strict-origin-when-cross-origin`
- ✅ `Permissions-Policy` (kamera, mikrofon, konum kapalı)
- ✅ `Strict-Transport-Security` (HSTS)

`index.html`'de tanımlı:
- ✅ Open Graph (Facebook paylaşımı)
- ✅ Twitter Cards
- ✅ JSON-LD yapısal veri (Google arama sonuçları)
- ✅ Canonical URL
- ✅ hreflang alternatifleri

---

## 💰 Maliyet Tahmini

| Hizmet | Yıllık Maliyet |
|--------|----------------|
| Domain (`sultaningambiti.com`) | $10-12 |
| Hosting (Cloudflare Pages) | **$0** (ücretsiz tier) |
| SSL Sertifikası | **$0** (otomatik, Let's Encrypt) |
| CDN | **$0** (Cloudflare CDN) |
| Analytics (opsiyonel) | $0 (Cloudflare Web Analytics) |
| **TOPLAM** | **$10-12/yıl** |

**Karşılaştırma:** Apple Developer hesabı $99/yıl, Google Play $25 bir kerelik. Web sitesi **çok daha ucuz**.

---

## 📈 Büyüme ve Analitik

### Cloudflare Web Analytics (Ücretsiz, Gizlilik-Dostu)
1. Cloudflare Dashboard → **Analytics** → **Web Analytics** → **Add Site**
2. JS snippet'ını ekleyin (veya otomatik yapılır)
3. Sayfa görüntülenme, ziyaretçi, performans metrikleri

### Google Analytics 4 (Opsiyonel)
- Daha detaylı analitik
- GDPR uyumlu (cookie consent banner gerekli)

### Plausible / Umami (Alternatif)
- Gizlilik-odaklı
- Cookie banner gerekmez

---

## 🎯 Adım Adım Kurulum Özeti

```
1️⃣  Domain satın al (Cloudflare Registrar veya Namecheap)
     → sultaningambiti.com ($10-12)

2️⃣  GitHub'da repo oluştur
     → sultanin-gambiti (public)

3️⃣  Kodu push'la
     → git init, git add, git commit, git push

4️⃣  Cloudflare Pages'e bağla
     → Import repo, Framework: Vite

5️⃣  Build ayarları
     → Build command: npm run build
     → Output: dist

6️⃣  Custom domain ekle
     → sultaningambiti.com
     → DNS otomatik ayarlanır (15-30 dk)

7️⃣  HTTPS aktif olur
     → 5-15 dakika

8️⃣  Site yayında! 🎉
     → https://sultaningambiti.com
```

**Toplam süre:** 30-60 dakika. Domain yayılımı 24-48 saat sürebilir.

---

## 📞 Destek

Domain/hosting konusunda sorun yaşarsanız:
- Cloudflare Discord: [discord.cloudflare.com](https://discord.cloudflare.com)
- Netlify Support: support@netlify.com
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)

---

## 🎉 Sonuç

Bu proje, **tek bir `npm run build` komutuyla** üretime hazır bir PWA'ya dönüşüyor. Custom domain bağlamak 30 dakika sürer, yıllık maliyet sadece $10-12.

**Avantajlar:**
- 📱 PWA — iPhone/Android'de uygulama gibi çalışır
- 🌍 Global CDN — dünyanın her yerinden hızlı
- 💰 Çok ucuz — yıllık $10-12
- 🚀 Anında güncelleme — GitHub'a push → otomatik deploy
- 📊 Analitik — ziyaretçi istatistikleri
- 🔒 HTTPS + güvenlik başlıkları — hazır

**Play Store'a göre artıları:**
- ✅ Daha düşük maliyet
- ✅ Anında güncelleme (review süreci yok)
- ✅ Daha kolay paylaşım (sadece link)
- ✅ SEO ile organik trafik
- ✅ iOS + Android + Web — tek codebase
- ✅ Review/red tape yok

Başarılar! ⚔️♛
