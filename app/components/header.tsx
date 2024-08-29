'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import { ModeToggle } from '../../ui/button-dark-mode';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();

  console.log(pathname);
  return (
    <div className={clsx(
      'flex bg-white dark:bg-black justify-between px-4',
      pathname == "/login" && 'hidden'
    )}>
      <div className='content-center'>
        <Image src={Logo} alt={'Logo'} width={90} priority={true} />
      </div>
      <div className='grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-35 rounded-3xl px-10 w-fit gap-5'>
        <div className={clsx(
          'content-center',
          activeLink === 'list-word' ? 'underline' : ''
        )}>
          <Link href="/list-word" onClick={() => setActiveLink("list-word")} className='whitespace-nowrap'>
            List word
          </Link>
        </div>
        <div className={clsx(
          'content-center',
          activeLink === 'learn' ? 'underline' : ''
        )}>
          <Link href="/learn" onClick={() => setActiveLink("learn")} className='whitespace-nowrap'>
            Learn English
          </Link>
        </div>
      </div>
      <div className='content-center'>
        <ModeToggle />
      </div>
    </div>
  )
}
