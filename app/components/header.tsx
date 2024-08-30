'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useTheme } from 'next-themes';
import { PowerIcon } from 'lucide-react';
import { signOut } from '../../auth';
import { SignOut } from '../../lib/data';

export default function Header() {
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  const { setTheme } = useTheme()

  console.log(pathname);
  return (
    <div className={clsx(
      'flex justify-between px-4',
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
        <div>
          <form
            action={async () => {
              SignOut()
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="hidden md:block">Sign Out</div>
            </button>
          </form>
        </div>
      </div>
      <div className='content-center'>
        <div className="flex items-center space-x-2 transition-all">
          <Switch id="dark-mode" onCheckedChange={(val) => val ? setTheme('dark') : setTheme('light')} />
          <Label htmlFor="dark-mode">Dark mode</Label>
        </div>
      </div>
    </div>
  )
}
