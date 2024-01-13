'use client';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Nav: React.FC = () => {
  const { setTheme } = useTheme();

  const lightThemeModeHandler = () => {
    setTheme('light');
  };
  const darkThemeModeHandler = () => {
    setTheme('dark');
  };
  const systemThemeModeHandler = () => {
    setTheme('system');
  };

  return (
    <nav className='w-full fixed top-0 inset-x-0 z-10 flex justify-between items-center bg-inherit'>
      <h1 className='text-2xl md:text-4xl'>
        <Link href='/'>Hacker News</Link>
      </h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
            <span className='sr-only'>Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={lightThemeModeHandler}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={darkThemeModeHandler}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={systemThemeModeHandler}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Nav;
