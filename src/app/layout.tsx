import type { Metadata } from 'next';
import { Playfair_Display, Dancing_Script, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Milkpig Birthday 27/8 & Special Date 25/8 | Mừng Sinh Nhật 27 Tuổi',
  description: 'Trang chúc mừng sinh nhật lãng mạn dành riêng cho Milkpig tuổi 27 kèm lộ trình hẹn hò đặc biệt ngày 25/8.',
  openGraph: {
    title: 'Happy 27th Birthday Milkpig 💖',
    description: 'Một bất ngờ lãng mạn dành riêng cho em!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${playfair.variable} ${dancing.variable} ${inter.variable}`}>
      <body className="antialiased bg-cream text-darkWine selection:bg-romantic-200 selection:text-romantic-800">
        {children}
      </body>
    </html>
  );
}
