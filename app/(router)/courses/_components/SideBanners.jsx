'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const SideBanners = () => {
    const [sideBannerList, setSideBannerList]= useState();
    
    useEffect(()=>{
            getSideBanners();
        },[])

    const getSideBanners= ()=>{
        GlobalApi.getSideBannner().then(res=>{
           
            setSideBannerList(res.sideBanners)
        })
        
    }
  return (
    <div>

        {sideBannerList?.map((item,index)=>(
            <div key={index} className='mb-3'>
                <Image src={item.banner.url} alt='banner'width={500} height={300}
                className='rounded-xl cursor-pointer'
                onClick={()=>window.open(item?.url)}/>
            </div>
        ))}
    </div>
  )
}

export default SideBanners