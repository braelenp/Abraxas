import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.abraxas.app',
  appName: 'Abraxas',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
    },
  },
};

export default config;
