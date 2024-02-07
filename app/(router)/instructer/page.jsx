import React from 'react'
import SideBanners from '../courses/_components/SideBanners'
import WelcomeBanner from '../courses/_components/WelcomeBanner'

function Instructer() {
  return (
    <div>


<div className='grid  md:grid-cols-4 p-5 gap-5'>
            <div className='col-span-3'>
               <WelcomeBanner/>

               <div className='p-5 bg-white rounded-lg mt-5'>
                   <div className='flex items-center  justify-center '>
                    <h2 className='text-[20px] p-5 font-bold text-primary flex items-center'>Yet to be Implemented this page functionality</h2>
                

            </div>
               </div>


             

            </div>
            <div className='p-5 bg-white rounded-xl'>
             <SideBanners/>
            </div>
        </div>
    </div>
  )
}

export default Instructer