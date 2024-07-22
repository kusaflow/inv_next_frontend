"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathName = usePathname();
    return pathName !== "/login" && pathName !== "/signup" ?(
    <footer className='border-t'>
      <div className='flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row'>
        <Link href="/">
          <Image 
                src = '/assets/images/logo.svg'
                alt='Logo'
                width={70}
                height={38}
                className="cursor-pointer"
            />
        
        </Link>
        <p> All Rights Reserve.</p>
      </div>
    </footer>
  ) :(<></>)
}

export default Footer