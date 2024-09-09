'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Switch } from './ui/switch';
import { useTheme } from 'next-themes';
import { SignOut } from '../../lib/data';
import { Session } from 'next-auth';
import { useSesion } from '@/stores/useSession';

export default function Header({sessionHeader}: {sessionHeader: Session | null}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme()
  const [checked, setChecked] = useState<boolean>(true)
  const router = useRouter();
  const { setUser } = useSesion()

  useEffect(() => {
    if (sessionHeader && sessionHeader.user) {
      setUser(sessionHeader.user);
      router.push('/home');
    }
  }, [sessionHeader, router, setUser]);

  useEffect(() => {
    setChecked(theme == 'dark')
  }, [theme])
  
  return (
    <div className={clsx(
      'flex justify-between px-4',
      sessionHeader == null && 'hidden'
    )}>
      <div className='content-center'>
        <Image src={Logo} alt={'Logo'} width={90} priority={true} />
      </div>
      <div className='grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-20 rounded-2xl px-10 w-fit gap-5'>
        <div className={clsx(
          'content-center',
          pathname === '/list-word' ? 'font-bold' : ''
        )}>
          <Link href="/list-word" className='whitespace-nowrap'>
            List word
          </Link>
        </div>
        <div className={clsx(
          'content-center',
          pathname === '/learn' ? 'font-bold' : ''
        )}>
          <Link href="/learn" className='whitespace-nowrap'>
            Learn English
          </Link>
        </div>
        <div className='content-center'>
          <form
            action={async () => {
              await SignOut()
              router.push('/login');
            }}
          >
            <button className='whitespace-nowrap'>
              Sign Out
            </button>
          </form>
        </div>
      </div>
      <div className='content-center'>
        <div className="flex items-center space-x-2 transition-all">
          <Switch id="dark-mode" onCheckedChange={(val) => val ? setTheme('dark') : setTheme('light')} checked={checked} />
        </div>
      </div>
    </div>
  )
}
