import type { Metadata } from 'next';
import { roboto } from './fonts'
import './globals.css';

export const metadata: Metadata = {
  title: 'CQRS+',
  description: 'UI for the CQRS Plus app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
