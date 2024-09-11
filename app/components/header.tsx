'use client'

import React from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SignOut } from '../../lib/data';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/20/solid';
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className={clsx(
      'flex justify-around px-4 py-5',
    )}>
      <div className='content-center'>
        <Image src={Logo} alt={'Logo'} width={90} priority={true} />
      </div>
      <div className='grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-20 rounded-2xl px-10 w-fit gap-5'>
        <div className={clsx(
          'content-center text-white',
          pathname === '/list-word' ? 'font-bold' : ''
        )}>
          <Link href="/list-word" className='whitespace-nowrap'>
            List word
          </Link>
        </div>
        <div className={clsx(
          'content-center text-white',
          pathname === '/learn' ? 'font-bold' : ''
        )}>
          <Link href="/learn" className='whitespace-nowrap'>
            Learn English
          </Link>
        </div>
      </div>
      <div className='content-center grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-20 rounded-2xl px-2 w-fit gap-5'>
        <div className="flex items-center space-x-2 transition-all">
          < ModeToggle />
          <form
            action={async () => {
              await SignOut()
              router.push('/login');
            }}
          >
            <button className='whitespace-nowrap text-white'>
              <ArrowLeftEndOnRectangleIcon className="w-5 text-white mt-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='hover:bg-transparent'>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
