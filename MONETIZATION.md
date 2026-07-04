# 💰 Osmanlı Satrancı — Para Kazanma Analizi

## 🎯 Kısa Cevap

**Evet, kazanabilirsiniz.** Ancak miktar senaryoya göre değişir:

| Senaryo | Yıllık Tahmini Gelir | Zorluk |
|---------|----------------------|--------|
| Yan proje (5-10 saat/hafta) | $200 – $2,000 | ⭐⭐ |
| Ciddi yan proje (20+ saat/hafta) | $2,000 – $15,000 | ⭐⭐⭐ |
| Tam zamanlı (40+ saat/hafta) | $10,000 – $100,000+ | ⭐⭐⭐⭐⭐ |
| Sıfır (yayınlarsanız bile) | $0 | — |

**Gerçekçi başlangıç hedefi:** İlk yıl $500 – $3,000 ek gelir.

---

## 📊 Pazar Verileri (2026)

### Satranç Uygulamaları
- **Chess.com** global pazar lideri — yıllık geliri **$30M+** (mobil + abonelik)
- **Lichess** ücretsiz açık kaynak — kâr amacı gütmüyor
- **Chess - Play & Learn** (Chess.com mobil) — günde 5M+ aktif kullanıcı
- **Top 10 satranç uygulaması** toplam yıllık geliri: **$80M+**

### Sizin Oyununuzun Konumu
- ✅ **Niş avantajı:** Türk/Osmanlı teması Batı pazarlarında özgün
- ✅ **Eğitim/öğretici boyut:** Tarih + satranç = ebeveynlerin tercih ettiği kategori
- ✅ **Rekabet azlığı:** Satranç + tarih + Türk kültürü teması neredeyse hiç yok
- ⚠️ **Sınırlı ölçek:** Saf satranç oyuncuları zaten Chess.com'da

### Monetizasyon ARPU (Ortalama Gelir/Kullanıcı — 90 gün)
- **Sıradan satranç uygulaması:** $0.20 – $0.80 reklam, $2-5 IAP
- **Premium özellikli (Chess.com gibi):** $5+ abonelik
- **Sizin oyununuz (tahmini):** $0.10 – $0.50 reklam, $1-3 IAP

---

## 💵 Para Kazanma Yöntemleri (Sıralı: kolay → zor)

### 1️⃣ Reklamlar (AdMob / Meta Audience Network) — **EN KOLAY**

**Ekleme süresi:** 1-2 saat
**Kullanıcı tepkisi:** Düşük olumsuz etki (eğer dikkatli yerleştirilirse)

**Strateji:**
- Banner reklam → sadece ana menüde
- Interstitial (tam ekran) → sadece oyun bittikten SONRA, "Yeni Oyun" butonundan önce
- Rewarded (ödüllü) → "Devam et" hakkı veya ipucu için (örn: taş hareketi önerme)
- **Asla oyun sırasında reklam GÖSTERMEYİN** — kullanıcıyı kaybedersiniz

**Tahmini gelir (1000 aktif kullanıcı için):**
- Günlük aktif: ~100
- Banner gösterim: ~2,000/gün
- Interstitial: ~50/gün
- eCPM (Türkiye): $1-3
- **Aylık:** $30-150
- **Yıllık:** $360-1,800

**Implementasyon:**
```bash
# En iyi reklam SDK'ları
- AdMob (Google) — en yaygın, %60 pay
- Meta Audience Network — yüksek eCPM
- Unity Ads — oyunlar için optimize
```

**Sorun:** Oyun tamamen ücretsiz kalırsa bile yeterli gelir yok. Rekabet çok yüksek.

---

### 2️⃣ Uygulama İçi Satın Alma (IAP) — **ORTA ZORLUK**

**Eklenme süresi:** 1-2 gün
**Kullanıcı tepkisi:** Orta (oyuncular premium içerik için ödeme yapar)

**Ürünler:**

| Ürün | Fiyat | Açıklama |
|------|-------|----------|
| Yeni Savaş Paketi | $1.99 | 3 ek savaş (Mohaç, İstanbul'un Fethi, vs.) |
| Tüm Savaşlar | $4.99 | 10+ savaş senaryosu |
| Lokum Paketi (gülmece) | $0.99 | Tüm renklerde özel taş setleri |
| Reklam Kaldırma | $1.99 | Tüm reklamları kaldır |
| Premium Hesap | $2.99/ay | Tüm açık içerik, özel AI zorlukları |

**Tahmini gelir (1000 indirme için):**
- Dönüşüm oranı: %2-5
- Ortalama satış: $2-4
- **Aylık:** $40-200
- **Yıllık:** $480-2,400

**Oyun içi nakit (In-App Currency) sistemi:**
- "Akçe" (Osmanlı para birimi) → özel taş setleri, animasyonlar
- Günlük ödül sistemi → geri dönüş
- Haftalık turnuvalar → premium ödüller

---

### 3️⃣ Abonelik Modeli — **ZOR ama EN KAZANÇLI**

**Eklenme süresi:** 1 hafta
**Kullanıcı tepkisi:** Düşük (Chess.com başarılı şekilde yapıyor)

**Plan yapısı:**
```
🆓 Ücretsiz:
- 2 savaş senaryosu
- AI (kolay)
- Reklamlı
- Çevrimiçi (sınırlı)

⭐ Pro ($2.99/ay veya $19.99/yıl):
- Tüm savaş senaryoları
- AI (tüm zorluklar)
- Reklamsız
- Çevrimiçi sınırsız
- Hamle analizi
- İstatistikler

👑 Aile ($4.99/ay):
- 6 hesap
- Ebeveyn paneli
- Tüm Pro özellikler
- Erken erişim yeni savaşlara
```

**Tahmini gelir (1000 aktif kullanıcı için):**
- Dönüşüm: %3-7
- Ortalama abonelik: $2.99/ay
- Churn (ayrılma): %15/ay
- **Aylık:** $90-210
- **Yıllık:** $1,080-2,520

**Chess.com başarısı:** 5M+ abone, $5+/ay ortalama = ayda $25M+ abonelik geliri

---

### 4️⃣ Premium Versiyon (Ücretli Uygulama) — **ORTA**

**Strateji:** $2.99 tek seferlik ücret
- Avantaj: Anında gelir, reklamsız
- Dezavantaj: İndirme oranı %70 düşer
- Türkiye gibi pazarlarda zayıf, ABD'de güçlü

**Tahmini gelir (1000 indirme):**
- Dönüşüm: %5-15 (satın alma yapanlar)
- Ortalama: $2.99
- **Aylık:** $150-450
- **Yıllık:** $1,800-5,400

**Freemium (ücretsiz + Pro) daha iyi sonuç verir.**

---

### 5️⃣ Sponsorluk / Marka Ortaklıkları — **İLERİ SEVİYE**

**Uygun ortaklar:**
- **Türk markaları:** Türk Hava Yolları, Ziraat Bankası, Arçelik, Türk Telekom
- **Eğitim kurumları:** Satranç federasyonları, üniversiteler
- **Yayıncılar:** Satranç kitapları, online satranç okulları

**Strateji:**
- Açılış ekranında 5 saniyelik sponsor logosu
- Özel turnuvalar
- Hükümdar portrelerinde "X markasının sunduğu" etiketi
- Gerçek savaş anlatımları (örn: "Ankara Muharebesi TRT sponsorluğunda")

**Potansiyel:** Yıllık $5,000-50,000 (Türkiye'ye özgü sponsorluklar)

---

### 6️⃣ İçerik Genişletme ile Gelir Artırma — **UZUN VADELİ**

**Eklenebilecek içerikler:**
- 8-10 ek savaş (Niğbolu, Varna, Kosova, vs.) → her biri DLC $0.99-1.99
- Gerçek savaş animasyonları
- Çok oyunculu turnuvalar (özel ödüller)
- Satranç dersleri (ücretli içerik)
- Ünlü Türk satranç oyuncularıyla işbirliği

**Potansiyel:** Yıllık $10,000-100,000+ (uzun vadede)

---

## 🛠️ Uygulama İçi Hemen Yapılabilecekler

### Aşama 1: İlk Hafta (Sıfır → Gelir)
```bash
✅ AdMob banner reklam (ana menü alt kısmında)
✅ AdMob interstitial (oyun bittikten sonra, kullanıcı "Yeni Oyun"a basmadan önce)
✅ Google Play Billing (IAP için altyapı)
✅ İlk IAP ürünü: "Reklam Kaldırma" $1.99
✅ Play Store listeleme (zaten hazır)
```

### Aşama 2: İlk Ay
```bash
✅ 2 ek savaş senaryosu (Mohaç 1526, İstanbul'un Fethi 1453) — DLC $1.99
✅ Rewarded reklam: "İpucu" özelliği
✅ Haftalık görevler → ödül sistemi
✅ Facebook/Instagram sayfası
✅ Influencer outreach (Türk satranç YouTuber'ları)
```

### Aşama 3: 3-6 Ay
```bash
✅ Abonelik modeli (aylık $2.99)
✅ Çevrimiçi turnuvalar (haftalık, ödüllü)
✅ Türkçe + İngilizce + Arapça
✅ Dünya satranç federasyonu (FIDE) entegrasyonu
✅ Liderlik tablosu (global)
```

### Aşama 4: 6-12 Ay
```bash
✅ iOS sürümü (App Store — ek %30 gelir)
✅ 10+ savaş senaryosu
✅ Özel taş setleri (Osmanlı sanatı, minyatür)
✅ Çok oyunculu takım savaşları
✅ Eğitim modu (yeni başlayanlar için)
```

---

## 💡 Başarı İçin Kritik Faktörler

### ✅ Yapmanız Gerekenler
1. **SEO/ASO'ya yatırım yapın** — Doğru anahtar kelimeler (PLAY_STORE.md hazır)
2. **Türk diasporasına ulaşın** — Almanya, Hollanda, ABD, Fransa'da 7M+ Türk
3. **Tarih/satranç YouTuber'larına ulaşın** — Türkçe ve İngilizce
4. **Reddit/Hacker News'te paylaşın** — "Türk yapımı tarihi satranç" ilgi çeker
5. **Sosyal medya içeriği** — Ekran görüntüleri, videolar
6. **Yerelleştirme** — Arapça, Farsça (İran pazarı!)
7. **Okul/satranç kulüpleriyle ortaklık** — Pazartesi/Çarşamba satranç dersleri
8. **Push notification** — Geri dönüş için ("Yeni savaş eklendi!")

### ❌ Yapmamanız Gerekenler
1. **Oyuna aşırı reklam koymayın** — Oyun deneyimini öldürür
2. **Güçlü oyuncu avantajı satmayın** — Pay-to-win (PTW) oyuncu kaybettirir
3. **Karanlık pattern kullanmayın** — "Sadece bir tıkla iptal et" gibi
4. **Çocuklara yönelik reklam** — Aile politikası ihlali
5. **Tarihi yanlış bilgi vermeyin** — Türk tarihçilerden doğrulama alın
6. **Tek gelir kaynağına güvenmeyin** — Çeşitlendirin

---

## 📈 Gerçekçi Senaryolar

### Senaryo A: "Yan Proje" (Minimum Efor)
- 5 saat/hafta bakım
- Sadece reklam + 1-2 IAP
- Pazarlama yok
- **İlk yıl:** $200-1,000
- **2. yıl:** $1,000-3,000 (organik büyüme)

### Senaryo B: "Ciddi Yan Proje" (Önerilen)
- 15-20 saat/hafta
- Reklam + IAP + 4-6 ek savaş
- Aktif sosyal medya
- Influencer işbirlikleri
- **İlk yıl:** $2,000-10,000
- **2. yıl:** $5,000-25,000

### Senaryo C: "Tam Zamanlı Girişim"
- 40+ saat/hafta
- Tüm modeller + abonelik
- Ekip kurma (tasarımcı, geliştirici, pazarlama)
- iOS + Android + Web
- Çoklu dilde yayın
- **İlk yıl:** $10,000-50,000
- **2-3. yıl:** $100,000-500,000

### Senaryo D: "Viral Başarı" (Şans eseri)
- Doğru zamanda viral olur
- Eğitim kurumları satın alır
- Devlet sponsorluğu
- **Yıllık:** $100,000+

---

## 🎓 Eğer Bu Projeyi Ciddiye Alıyorsanız

### Önümüzdeki 30 Gün İçin Yol Haritası

**Hafta 1: Altyapı**
- [ ] Play Console hesabı ($25 bir kerelik ücret)
- [ ] AdMob hesabı
- [ ] Google Play Billing kurulumu
- [ ] Gizlilik politikası sayfası
- [ ] Uygulama ikonu tasarımı (Play Store için)

**Hafta 2: Monetizasyon**
- [ ] AdMob SDK entegrasyonu
- [ ] İlk banner reklam (ana menü)
- [ ] Interstitial (oyun sonu)
- [ ] "Reklam Kaldırma" IAP
- [ ] Test ödemeleri (internal test track)

**Hafta 3: Pazarlama Materyalleri**
- [ ] Play Store ekran görüntüleri (8 adet)
- [ ] 30 saniyelik tanıtım videosu
- [ ] YouTube intro/trailer
- [ ] Reddit/Discord paylaşımı

**Hafta 4: Yayın**
- [ ] Internal test (kapalı alfa)
- [ ] Closed beta (50-100 kişi)
- [ ] Production release
- [ ] Influencer outreach
- [ ] İlk kullanıcı geri bildirimlerini topla

### Yatırım Tutarı
- **Minimum:** $25 (Play Console) + boş zamanınız
- **Tavsiye edilen:** $25 + $100-500 grafik/müzik outsource
- **Ciddi:** $25 + $2,000-5,000 (profesyonel tasarım, reklam)

---

## 🇹🇷 Türkiye'ye Özel Strateji

### Avantajlar
- Düşük CPM ama yüksek indirme sayısı
- Türk diasporası (özellikle Avrupa'da 7M+)
- Türk kültürüne pozitif yaklaşım
- Eğitim Bakanlığı ilgisi (oyunla öğrenme)

### Dezavantajlar
- Düşük ortalama gelir (kullanıcı başına)
- Dolar/TL kuru dalgalanması
- Ödeme yöntemi kısıtları (kredi kartı penetrasyonu)

### Taktikler
- **Pazartesi/Çarşamba okul turnuvaları** — eğitim kurumları
- **Türk satranç federasyonu sponsorluğu** — resmi ortaklık
- **Bölgesel turnuvalar** (Ankara, İstanbul, İzmir)
- **Üniversite satranç kulüpleri** — öğrenci indirimleri

---

## ⚖️ Vergi ve Yasal Konular (Türkiye)

### Gelir Bildirimi
- Yıllık $5,000+ → **vergi mükellefi olmanız gerekir**
- Google/Apple ödemeleri banka havalesi/EFT ile gelir
- **KDV:** Eğer uygulama içi satış varsa %20 KDV (satıcı Google öder)

### Vergi Türleri
- **Gelir vergisi:** Kazancınıza göre %15-40
- **Stopaj:** Google bazı pazarlarda otomatik stopaj uygular
- **Bağımsız çalışan:** Şahıs şirketi açmanız önerilir

### Yapmanız Gerekenler
- [ ] Mali müşavir/muhasebeci tutun
- [ ] Şahıs şirketi veya limited şirket açın
- [ ] Aylık KDV beyannamesi verin
- [ ] Yıllık gelir vergisi beyannamesi verin

---

## 🎯 Sonuç ve Tavsiyem

**Sizin oyununuz için en gerçekçi yol:**

1. **Hemen yayınlayın** — Mükemmellik beklemeyin, MVP ile başlayın
2. **İlk ay sadece reklam** — Basit, hızlı, risksiz
3. **3. ayda 1-2 IAP** — Kullanıcı tabanınız büyüdükçe
4. **6. ayda abonelik** — Eğer 1000+ aktif kullanıcınız varsa
5. **12. ayda ek savaşlar** — DLC olarak $1.99

**Eğer sadece "deneyim" istiyorsanız:**
- Tek başınıza yapabilirsiniz
- $25 Play Console + birkaç gün
- İlk yıl $500-2,000 ek gelir + öğrenme

**Eğer ciddi bir gelir kaynağı istiyorsanız:**
- Pazarlamaya $500-2,000 yatırım
- Influencer işbirlikleri
- Sürekli içerik güncellemesi (ayda 1 yeni savaş)
- 2-3 yıllık bir zaman dilimi

**En önemli tavsiye:** Oyunu sevin, kullanıcılarla etkileşim kurun, geri bildirim alın. Para, iyi ürünün doğal sonucudur.

---

## 📞 Öğrenilebilecek Kaynaklar

- **Google Play Console Academy** (ücretsiz)
- **IndieHackers.com** (indie geliştirici topluluğu)
- **r/IndieDev** (Reddit)
- **r/AndroidDev** (Reddit)
- **"The Lean Startup"** (Eric Ries) — girişimcilik kitabı
- **Sensor Tower / data.ai** — pazar analizi araçları

---

**Son söz:** Bu oyun, kalbi olan, özgün bir proje. Tarihi ve kültürel bir nişte. Doğru pazarlama ile küçük ama anlamlı bir gelir elde edebilirsiniz. Büyük ihtimalle zengin olmayacaksınız, ama öğrenecek, deneyim kazanacak ve belki de Türk oyun sektörüne küçük bir katkıda bulunacaksınız. Başarılar! 🏰⚔️
