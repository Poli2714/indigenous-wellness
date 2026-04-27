import { Metadata } from 'next';
import React from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './styles/globals.css';

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
    <html lang='en' className={plusJakartaSans.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
