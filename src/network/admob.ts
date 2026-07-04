/**
 * AdMob reklam servisi.
 * ÖNEMLİ: Tüm import'lar DİNAMİK — böylece web tarayıcısında (native olmayan)
 * @capacitor-community/admob paketi HİÇ yüklenmez ve uygulamayı çökertmez.
 */

/** Banner Ad Unit ID */
export const BANNER_AD_UNIT_ID = 'ca-app-pub-3328238647509751/3841044792';

/** App ID (capacitor.config.ts'te de var, burada da tutuyoruz) */
export const APP_ID = 'ca-app-pub-3328238647509751~6498293452';

let initialized = false;

/** Native platform mu kontrol eder. Web'de her zaman false döner. */
async function isNative(): Promise<boolean> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

/** AdMob'u başlatır. Sadece native platformlarda çalışır; web'de no-op. */
export async function initAdMob(): Promise<void> {
  try {
    if (!(await isNative())) return;
    if (initialized) return;
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.initialize({
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
    if (!(await isNative())) return;
    const { AdMob, BannerAdSize, BannerAdPosition } = await import(
      '@capacitor-community/admob'
    );
    await AdMob.showBanner({
      adId: BANNER_AD_UNIT_ID,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
    });
  } catch (err) {
    console.warn('Banner gösterilemedi:', err);
  }
}

/** Banner'ı gizler. */
export async function hideBanner(): Promise<void> {
  try {
    if (!(await isNative())) return;
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.hideBanner();
  } catch (err) {
    console.warn('Banner gizlenemedi:', err);
  }
}

/** Banner'ı tamamen kaldırır. */
export async function removeBanner(): Promise<void> {
  try {
    if (!(await isNative())) return;
    const { AdMob } = await import('@capacitor-community/admob');
    await AdMob.removeBanner();
  } catch (err) {
    console.warn('Banner kaldırılamadı:', err);
  }
}
