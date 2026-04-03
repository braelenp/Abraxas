import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.firstson.app',
  appName: 'The First Son',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystorePath: process.env['KEYSTORE_PATH'] ?? '../release.keystore',
      keystorePassword: process.env['KEYSTORE_PASSWORD'],
      keystoreAlias: process.env['KEYSTORE_ALIAS'] ?? 'firstson',
      keystoreAliasPassword: process.env['KEYSTORE_ALIAS_PASSWORD'],
      releaseType: 'APK',
    },
  },
}

export default config
