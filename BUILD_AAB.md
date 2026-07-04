# 🏰 Osmanlı Satrancı — Android AAB Build Rehberi

Bu proje **Capacitor** ile Android App Bundle (AAB) üretmek üzere yapılandırıldı.

## ⚡ Hızlı Başlangıç

Projeyi kendi makinenizde derleyip AAB üretmek için:

```bash
# Debug AAB (imzasız, test için) — 5-10 dakika
npm run aab:debug

# Release AAB (imzalı, mağaza için) — aynı süre, +keystore ayarı gerekir
npm run aab:release
```

İlk çalıştırmada:
1. `vite build` — web dosyalarını `dist/` üretir (~2 sn)
2. `cap add android` — `android/` klasörünü oluşturur (bir kerelik, ~2 dk)
3. `cap sync` — web içeriğini Android projesine kopyalar
4. `gradlew bundleRelease/Debug` — AAB üretir (~3-5 dk, ilk seferde Gradle indirir)

**Çıktı:** `android/app/build/outputs/bundle/{release|debug}/app-{release|debug}.aab`

## 📋 Önkoşullar (kendi makinenize)

### 1. Node.js 18+
```bash
node --version  # v18 veya üstü
```

### 2. Java JDK 17
```bash
java -version  # openjdk 17.x
```
macOS: `brew install openjdk@17`
Ubuntu: `sudo apt install openjdk-17-jdk`
Windows: [Adoptium](https://adoptium.net/) üzerinden indirin

### 3. Android SDK (command-line tools)
```bash
# ANDROID_HOME veya ANDROID_SDK_ROOT ayarlayın
export ANDROID_HOME=$HOME/Library/Android/sdk     # macOS
export ANDROID_HOME=$HOME/Android/Sdk              # Linux
export ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk    # Windows

# gerekli bileşenler
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

### 4. Gradle (Capacitor'ın wrapper'ı otomatik indirir, ayrıca kurulum gerekmez)

## 🔐 Release İmzalama (Mağaza Yükleme İçin)

AAB dosyasını Google Play'e yüklemeden önce **signing keystore** gerekli.

### Keystore oluşturma
```bash
keytool -genkey -v -keystore my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias osmanli-satranc
```

### `android/app/build.gradle` keystore ayarı
Dosyayı açın ve şu blokları ekleyin:

```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('OSMANLI_KEYSTORE_FILE')) {
                storeFile file(OSMANLI_KEYSTORE_FILE)
                storePassword OSMANLI_KEYSTORE_PASSWORD
                keyAlias OSMANLI_KEY_ALIAS
                keyPassword OSMANLI_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
        }
    }
}
```

### Ortam değişkenleri
```bash
export OSMANLI_KEYSTORE_FILE=/path/to/my-release-key.jks
export OSMANLI_KEYSTORE_PASSWORD=şifreniz
export OSMANLI_KEY_ALIAS=osmanli-satranc
export OSMANLI_KEY_PASSWORD=şifreniz

npm run aab:release
```

## 🎮 Mağaza Yükleme

1. [Google Play Console](https://play.google.com/console) → Uygulama oluştur
2. **Sürüm → Üretim → Yeni sürüm oluştur**
3. `app-release.aab` dosyasını yükle
4. Sürüm notları, içerik derecelendirmesi, hedef kitle ekle
5. **İncelemeye gönder** (1-3 gün sürer)

## 📱 Uygulama Bilgileri

- **App ID:** `com.osmanli.satranc`
- **App Name:** `Osmanlı Satrancı`
- **Min SDK:** 22 (Android 5.1)
- **Target SDK:** 34 (Android 14)
- **Permissions:** İnternet (PeerJS için) — Capacitor varsayılan olarak ekler

## 🛠️ Manuel Capacitor Komutları

```bash
# Web'i Android'e kopyala
npm run cap:sync

# Android Studio'da aç (varsa)
npm run cap:open

# Manuel debug build
cd android
./gradlew bundleDebug
# → app/build/outputs/bundle/debug/app-debug.aab

# Manuel release build (imzasız)
./gradlew bundleRelease
# → app/build/outputs/bundle/release/app-release-unsigned.aab
```

## ❓ Sorun Giderme

**"SDK location not found"** → `ANDROID_HOME` ortam değişkenini ayarlayın
**"JAVA_HOME not set"** → JDK 17 kurun ve `JAVA_HOME` ayarlayın
**"License not accepted"** → `sdkmanager --licenses` çalıştırıp tümünü kabul edin
**Gradle çok yavaş** → İlk build 5+ dakika sürebilir, sonraki build'ler hızlıdır
**"Out of memory"** → `android/gradle.properties`'e `org.gradle.jvmargs=-Xmx4g` ekleyin

## 📦 Bundle İçeriği

Capacitor'ın ürettiği AAB içinde:
- `assets/public/` — tek dosyalı HTML (vite-plugin-singlefile, ~458KB)
- `assets/capacitor.config.json`
- `res/`, `lib/` — native Android kaynakları
- `classes.dex` — Kotlin/Java sınıfları

**Toplam AAB boyutu:** ~3-5 MB (oynaması için indirilmesi gereken kısım).
