import Image from 'next/image'
import React from 'react'

function WelcomeBannerDashborad({user}) {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>

        <Image src='/dashboard2.png' alt='banner' width={70} height={100}/>
     <div>
        <h2 className='
         font-bold text-[27px]'>Welcome Back , <span 
        className='text-primary'>Giremy</span></h2>
        <h2 className='text-gray-500'>Explore,Learn and Build All Real Life Hero</h2>
     </div>
   
    </div>
  )
}

export default WelcomeBannerDashborad