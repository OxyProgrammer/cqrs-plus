import type { Metadata } from 'next';
import { roboto } from './fonts';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <body className={roboto.className}>
        <div className='flex flex-col'>
          {/* HEADER */}
          <Header />
          <main className='container mx-auto p-4 flex flex-col flex-grow min-h-screen'>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
