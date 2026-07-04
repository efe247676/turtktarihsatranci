#!/bin/bash
# Osmanlı Satrancı - Android AAB Build Script
# Bu script: vite build → cap sync → gradle bundle

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏰 OSMANLI SATRANCI - AAB BUILD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1) Web build
echo ""
echo "📦 [1/3] Web build..."
npm run build

# 2) Capacitor Android projesi (yoksa)
if [ ! -d "android" ]; then
  echo ""
  echo "🤖 [2/3] Capacitor Android projesi oluşturuluyor..."
  npx --yes cap add android
else
  echo ""
  echo "🤖 [2/3] Android projesi zaten var, atlanıyor."
fi

# 3) Sync + Gradle
echo ""
echo "🔄 [3/3] Capacitor sync + Gradle bundleRelease..."
npx --yes cap sync android
cd android
./gradlew bundleRelease --no-daemon

# Sonuç
AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
if [ -f "$AAB_PATH" ]; then
  SIZE=$(du -h "$AAB_PATH" | cut -f1)
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ AAB ÜRETİLDİ: $AAB_PATH ($SIZE)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo ""
  echo "⚠️  AAB üretilemedi. Yukarıdaki hata mesajlarını kontrol edin."
  exit 1
fi
