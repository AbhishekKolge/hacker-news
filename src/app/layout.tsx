import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Nav from '@/components/ui/nav';

import ThemeProvider from '@/state/theme-provider';
import QueryProvider from '@/state/query-provider';

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
    <QueryProvider>
      <html lang='en'>
        <body className={`${inter.className} relative min-h-screen`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            <main className='w-screen min-h-screen pt-28 h-auto'>
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
};

export default RootLayout;
