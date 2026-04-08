import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coming Soon - Toy Wonderland',
  description: 'The most amazing kids toys shop is launching soon! Get ready for a world of fun and imagination.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
