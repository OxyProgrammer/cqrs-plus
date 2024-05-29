import React from 'react';
import Image from 'next/image';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='bg-gray-800 text-white py-4 px-8 flex items-center justify-between sticky top-0'>
      <div>
        <Image
          src='./logo.svg'
          alt='Logo'
          height={0}
          width={0}
          style={{ width: 'auto', height: '30px' }}
        />
      </div>
      
    </header>
  );
};

export default Header;
