import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='bg-gray-800 text-white py-4 px-8 flex items-center justify-between sticky top-0'>
      <div>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Logo'
            height={0}
            width={0}
            style={{ width: 'auto', height: '30px' }}
          />
        </Link>
      </div>
      <div className='space-x-4'>
        <Link href='/new-post' target={'_blank'} rel={'noreferrer'}>
          <span className='text-blue-300'>New Post</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
