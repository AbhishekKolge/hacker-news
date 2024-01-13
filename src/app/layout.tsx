import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';

import Nav from '@/components/ui/nav';

import Provider from '@/state/provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker News',
  description: 'Hacker news powered by Algolia search.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Provider>
      <html lang='en'>
        <body className={`${inter.className} relative min-h-screen`}>
          <Nav />
          <main className='w-screen min-h-screen pt-28 h-auto'>{children}</main>
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
