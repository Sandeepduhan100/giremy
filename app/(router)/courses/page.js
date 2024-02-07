import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourceList from './_components/CourceList'
import SideBanners from './_components/SideBanners'

function Courses() {
    return (
        <div className='grid  md:grid-cols-4 p-5 gap-5'>
            <div className='col-span-3'>
               <WelcomeBanner/>

               <CourceList/>

            </div>
            <div className='p-5 bg-white rounded-xl'>
             <SideBanners/>
            </div>
        </div>
    )
}

export default Courses