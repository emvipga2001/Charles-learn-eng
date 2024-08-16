import React from 'react'
import Link from "next/link";
import Logo from "../../public/Logo.png"
import { ModeToggle } from '../../ui/button-dark-mode';
import Image from 'next/image';

export default async function Header() {
  return (
    <div className='flex justify-center bg-white dark:bg-black'>
      <div className='grid grid-flow-col auto-cols-auto bg-gray-300 bg-opacity-35 rounded-3xl py-3 px-10 w-fit gap-5'>
        <div className='content-center'>
          <Image src={Logo} alt={'Logo'} width={90}/>
        </div>
        <div className='content-center hover:bg-blue-300 rounded-xl px-5'>
          <Link href="/learn">
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
