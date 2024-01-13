import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav className='w-full fixed top-0 inset-x-0 z-10 flex justify-between items-center bg-white'>
      <h1 className='text-2xl md:text-4xl'>
        <Link href='/'>Hacker News</Link>
      </h1>
    </nav>
  );
};

export default Nav;
