"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { 
  SignInButton, 
  SignedIn, 
  SignedOut, 
  UserButton 
} from '@clerk/nextjs';
import { Button } from '../../../components/ui/button';

const Header = () => {
  const path = usePathname();

  return (
    <div className='w-full items-center bg-[#cfcccc] p-2 px-5 flex justify-between'>
      <p className='text-2xl font-bold text-[#120a0a]'>SkillSync</p>
      <div className='hidden md:flex gap-[5rem] text-black mx-2'>
        <Link href='/' className={`hover:text-primary hover:font-bold ${path == '/' && 'text-primary font-bold'}`}>Home</Link>
        <Link href='/dashboard' className={`hover:text-primary hover:font-bold ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</Link>
        <Link href='/study' className={`hover:text-primary hover:font-bold ${path == '/study' && 'text-primary font-bold'}`}>Study</Link>
        <Link href='/interview' className={`hover:text-primary hover:font-bold ${path == '/interview' && 'text-primary font-bold'}`}>Ai Interview</Link>
        <Link href='/contact' className={`hover:text-primary hover:font-bold ${path == '/contact' && 'text-primary font-bold'}`}>Contact</Link>
      </div>
      <SignedOut>
        <Button><SignInButton /></Button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Header;
