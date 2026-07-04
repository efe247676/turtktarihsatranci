import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

/** Banner Ad Unit ID */
export const BANNER_AD_UNIT_ID = 'ca-app-pub-3328238647509751/3841044792';

/** App ID (capacitor.config.ts'te de var, burada da tutuyoruz) */
export const APP_ID = 'ca-app-pub-3328238647509751~6498293452';

let initialized = false;

/** AdMob'u başlatır. Sadece native platformlarda çalışır; web'de no-op. */
export async function initAdMob(): Promise<void> {
  // Capacitor.isNativePlatform kontrolü — web'de çalışmaz
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    if (initialized) return;
    await AdMob.initialize({
      // App ID capacitor.config.ts'ten alınır; burada override gerekmiyor
      // testingDevices: ['DEVICE_ID'] test için eklenebilir
      initializeForTesting: true,
    });
    initialized = true;
  } catch (err) {
    console.warn('AdMob init hatası (web ortamı veya plugin yok):', err);
  }
}

/** Alt kenarda banner reklam gösterir. */
export async function showBanner(): Promise<void> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    await AdMob.showBanner({
      adId: BANNER_AD_UNIT_ID,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      // 60 saniyede bir yenile (AdMob default: 60s)
      // isProd: false // test için
    });
  } catch (err) {
    console.warn('Banner gösterilemedi:', err);
  }
}

/** Banner'ı gizler (tamamen kaldırmaz, tekrar showBanner ile döndürülebilir). */
export async function hideBanner(): Promise<void> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    await AdMob.hideBanner();
  } catch (err) {
    console.warn('Banner gizlenemedi:', err);
  }
}

/** Banner'ı tamamen kaldırır. */
export async function removeBanner(): Promise<void> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (!Capacitor.isNativePlatform()) return;
    await AdMob.removeBanner();
  } catch (err) {
    console.warn('Banner kaldırılamadı:', err);
  }
}
