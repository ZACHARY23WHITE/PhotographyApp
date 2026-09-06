import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zachwhite.shotly',
  appName: 'Shotly',
  // Capacitor serves the Next.js static export produced by `npm run build:capacitor`.
  webDir: 'out',
  plugins: {
    FirebaseAuthentication: {
      // We run the native Google/Apple flow but sign in through the Firebase JS
      // SDK (see src/lib/social-auth.ts) so the JS SDK stays the source of truth.
      skipNativeAuth: true,
      providers: ['google.com', 'apple.com'],
    },
  },
};

export default config;
