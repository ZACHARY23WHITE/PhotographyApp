import type { Metadata, Viewport } from 'next';
import { Nunito, Fredoka } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '600', '700', '800', '900'] });

// Chunky, rounded display face for headings / brand voice — pairs with Nunito
// body text to give the UI typographic hierarchy instead of one flat weight.
const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Shotly — Learn Photography',
  description: 'Master composition, color, and technique through bite-sized lessons.',
};

// Native-app-ready viewport: fill the screen edge-to-edge (so our
// safe-area-inset padding handles notches), lock scale like a native app,
// and tint the status bar to match our sky background.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F0F7FF',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
