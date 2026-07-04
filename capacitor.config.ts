import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.turktarihi.satranc',
  appName: 'Türk Tarihi Satrancı',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true,
  },
  server: {
    androidScheme: 'https',
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-3328238647509751~6498293452',
      // Ad Unit ID'ler plugin üzerinden initialize sırasında set edilecek
    },
  },
};

export default config;
