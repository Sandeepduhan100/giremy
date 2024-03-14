'use client'
import { useUser } from '@clerk/nextjs'
import { BadgeIcon, BookOpen, GraduationCap, LayoutDashboard, LibraryBig, Newspaper } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideNav = () => {
    const path = usePathname();
    const {user}= useUser()

    const menu=[
        {
            id:8,
            name:'Dashboard',
            icon:LayoutDashboard,
            path:'/dashboard',
            auth:user
        },
        {
            id:8,
            name:'All Courses',
            icon:BookOpen,
            path:'/courses',
            auth:true
        },
        {
            id:2,
            name:'Giremy Pro',
            icon:BadgeIcon,
            path:'/giremy-pro',
            auth:true
          
        },
        {
            id:3,
            name:'Be Instructer',
            icon:GraduationCap,
            path:'/instructer',
            auth:true,
        },
        {
            id:4,
            name:'Store',
            icon:LibraryBig,
            path:'/store',
            auth:true,
        },
        {
            id:5,
            name:'NewsLatter',
            icon:Newspaper,
            path:'/newslatter',
            auth:true,
        }
    ]

  return (
    <div className='p-5 bg-white shadow-sm border h-screen'>
<Image src='/logogiremy.PNG' alt='logo' width={200} height={50}/>  
     <hr className='mt-8'/>
     {/* Menu list */}
    <div className='mt-8 '>
        {
            menu.map((item,index)=>item.auth&&(
                <Link href={item.path} key={index}>
                <div className={`group flex gap-3 mt-1 p-3
                text-[18px] items-center text-gray-500
                cursor-pointer hover:bg-primary hover:text-white
                rounded-md transition-all ease-in-out duration-200
                ${path.includes(item.path)&&'bg-primary text-white'}`}>
                    <item.icon className='group-hover:animate-bounce'/>
                    <h2>{item.name}</h2>
                </div></Link>
            ))
        }
    </div>

  </div>
  )
}

export default SideNav