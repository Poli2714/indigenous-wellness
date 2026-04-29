import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import React from 'react';

import Footer from '@/modules/site/footer/components/Footer';
import Header from '@/modules/site/header/components/Header';
import { ThemeProvider } from '@/modules/site/components/ThemeProvider';

import './styles/globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html
      lang='en'
      className={plusJakartaSans.className}
      suppressHydrationWarning
    >
      <body className='flex flex-col items-center'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className='flex w-full max-w-384 flex-col items-center'>
            {children}
          </main>
          <Footer />
          <Toaster position='bottom-right' richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
