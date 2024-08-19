'use client'

import React, { useState } from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import { ModeToggle } from '../../ui/button-dark-mode';
import Image from 'next/image';
import clsx from 'clsx';

export default function Header() {
  const [activeLink, setActiveLink] = useState('');

  return (
    <div className='flex justify-center bg-white dark:bg-black'>
      <div className='grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-35 rounded-3xl py-3 px-10 w-fit gap-5'>
        <div className='content-center'>
          <Image src={Logo} alt={'Logo'} width={90} priority={true} />
        </div>
        <div className={clsx(
          'content-center rounded-xl px-5',
          activeLink === 'list-word' ? 'bg-blue-300' : ' hover:underline'
        )}>
          <Link href="/list-word" onClick={() => setActiveLink("list-word")}>
            List word
          </Link>
        </div>
        <div className={clsx(
          'content-center rounded-xl px-5',
          activeLink === 'learn' ? 'bg-blue-300' : 'hover:underline'
        )}>
          <Link href="/learn" onClick={() => setActiveLink("learn")}>
            Learn English
          </Link>
        </div>
        <div className='content-center'>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
