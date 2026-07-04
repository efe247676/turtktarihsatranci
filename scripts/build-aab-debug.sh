#!/bin/bash
# Osmanlı Satrancı - Android Debug AAB Build (imzasız, test için)

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🏰 OSMANLI SATRANCI - DEBUG AAB BUILD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

echo "📦 [1/3] Web build..."
npm run build

if [ ! -d "android" ]; then
  echo "🤖 [2/3] Capacitor Android projesi oluşturuluyor..."
  npx --yes cap add android
else
  echo "🤖 [2/3] Android projesi zaten var."
fi

echo "🔄 [3/3] Capacitor sync + Gradle bundleDebug..."
npx --yes cap sync android
cd android
./gradlew bundleDebug --no-daemon

AAB_PATH="app/build/outputs/bundle/debug/app-debug.aab"
if [ -f "$AAB_PATH" ]; then
  SIZE=$(du -h "$AAB_PATH" | cut -f1)
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ DEBUG AAB ÜRETİLDİ: $AAB_PATH ($SIZE)"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "⚠️  AAB üretilemedi."
  exit 1
fi
