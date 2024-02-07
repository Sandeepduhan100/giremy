'use client'
import React, { useEffect, useState } from 'react'
import WelcomeBannerDashborad from './_components/WelcomeBannerDashborad'
import { useUser } from '@clerk/nextjs'
import SideBanners from '../courses/_components/SideBanners';
import InProgressCourseList from './_components/InProgressCourseList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Dashboard() {
   const {user}= useUser();
   const [userEnrolledCourses,setUserEnrolledCourses]=useState([])
  useEffect(()=>{
   user&&getAllUserEnroolledCoourse();
  },[user])

  const getAllUserEnroolledCoourse =()=>{
    GlobalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress).then(res=>{
      console.log(res);
      setUserEnrolledCourses(res?.userEnrollCourses
        )
    })
  }
 
  return (
    <div className='grid  md:grid-cols-4 p-5 gap-5'>
            <div className='col-span-3'>
               <WelcomeBannerDashborad user={user}/>
           

             <InProgressCourseList userEnrolledCourses={userEnrolledCourses}/>
            </div>
            <div className='p-5 bg-white rounded-xl'>
             <SideBanners/>
            </div>
        </div>
  )
}

export default Dashboard