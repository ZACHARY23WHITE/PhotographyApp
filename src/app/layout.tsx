import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/auth-context';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Shotly — Learn Photography',
  description: 'Master composition, color, and technique through bite-sized lessons.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
