'use client'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { BellDot, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const {user,isLoaded}= useUser()
  return (
    <div className='p-4 bg-white flex justify-between'> 
        <div className='flex gap-2 border p-2 rounded-md '>
            <Search/>
            <input type="text" placeholder='Search' className='outline-none' />
        </div>
        <div className='flex gap-4 items-center'>
            <BellDot/>
           {isLoaded&&user
           ?<UserButton afterSignOutUrl='/courses'/>
          :
          <Link href={'/sign-in'}><Button>Get Started</Button></Link>
          }
        </div>
    </div>
  )
}

export default Header