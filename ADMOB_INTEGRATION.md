# 💰 AdMob Entegrasyonu — Yapılanlar

## Eklenen Reklam Kimlikleri

| Tür | ID |
|-----|-----|
| **App ID** | `ca-app-pub-3328238647509751~6498293452` |
| **Banner Ad Unit ID** | `ca-app-pub-3328238647509751/3841044792` |

## Eklenen/Güncellenen Dosyalar

### 1. `src/network/admob.ts` (YENİ)
- `initAdMob()` — Native platformda AdMob'u başlatır
- `showBanner()` — Alt kenarda banner gösterir
- `hideBanner()` — Banner'ı gizler
- `removeBanner()` — Banner'ı tamamen kaldırır
- Tüm fonksiyonlar **web'de no-op** (Capacitor.isNativePlatform kontrolü)

### 2. `capacitor.config.ts` (GÜNCELLENDİ)
- `plugins.AdMob.appId` eklendi
- `initializeForTesting: true` (production'da kaldırılmalı)

### 3. `src/App.tsx` (GÜNCELLENDİ)
- `useEffect` — uygulama başlangıcında AdMob init
- `useEffect` — ekran değişiminde banner'ı yönet:
  - **`game` ekranında**: Banner **gizli** (oyun sırasında dikkat dağıtmaz)
  - **Diğer tüm ekranlarda** (menü, savaş seçimi, çevrimiçi lobby, vb.): Banner **görünür**
  - 400ms gecikme ile gösterim (akıcı ekran geçişi)

## Banner Stratejisi

✅ **Banner gösterilen ekranlar** (kullanıcı boşta):
- Ana Menü
- Savaş Seçimi
- Savaş Özeti
- Online Menü
- Matchmaking
- Invite Host / Guest
- Oyun Sonu (overlay üzerinde)

❌ **Banner gizlenen ekranlar** (odak gerekli):
- Oyun Tahtası (game) — dikkat dağıtmamak için

## Android Tarafında Yapılması Gerekenler

Capacitor Android projesi oluşturulduğunda (`npx cap add android`) otomatik olarak:

1. **AndroidManifest.xml**'e şu eklenir:
   ```xml
   <uses-permission android:name="android.permission.INTERNET" />
   <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="ca-app-pub-3328238647509751~6498293452"/>
   ```

2. **app/build.gradle**'a AdMob dependency eklenir:
   ```gradle
   implementation 'com.google.android.gms:play-services-ads:23.x.x'
   ```

3. **MainActivity.java**'ya AdMob plugin import'u eklenir.

## Production'a Geçerken

`src/network/admob.ts` içinde:
```typescript
// TEST MODU (şu an açık)
await AdMob.initialize({
  initializeForTesting: true,  // ← BUNU KAPAT
});
```

Test modu kapatıldığında:
- Test cihaz ID'lerini AdMob Console'dan ekleyin
- "Reklam Kaldırma" IAP satın alan kullanıcılar için banner göstermeyin
- CTR (Click-Through Rate) ve impression metriklerini izleyin

## Test Etme

1. `npm run aab:debug` ile debug AAB oluşturun
2. Android cihaza veya emülatöre yükleyin
3. Banner'ın ana menüde göründüğünü, oyuna girince kaybolduğunu doğrulayın
4. AdMob Console'dan "Test" reklamları gözlemleyin

## Sorun Giderme

**Banner görünmüyor:**
- AdMob Console'da hesabın aktif olması gerekir (24 saat sürebilir)
- İlk açılışta "Reklam yükleniyor..." gözükebilir (1-3 saniye)
- İnternet bağlantısı gerekli

**Web'de çalışmıyor:**
- Normal — AdMob sadece native (Android/iOS) çalışır
- Web için AdSense ayrı entegrasyon gerekir

**"Ad failed to load":**
- Test modu kapatıldıysa ve hesap yeni açıldıysa olabilir
- AdMob Console → Blocklist kontrolü yapın

## Gelir Tahmini

**Banner reklam** (BANNER, 320x50, alt kenarda):
- eCPM (Türkiye): $0.50-2.00
- eCPM (ABD): $2-5
- 1000 aktif kullanıcı için günlük: $1-5
- **Aylık:** $30-150 (TR), $60-300 (Global)
- **Yıllık:** $360-1,800 (TR), $720-3,600 (Global)

İlk günlerde düşük olur, organik büyüme ile artar.
