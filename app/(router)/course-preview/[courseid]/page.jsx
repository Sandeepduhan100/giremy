'use client'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from './_components/CourseVideoDescription';
import GlobalApi from '@/app/_utils/GlobalApi';
import CourseEnrollSection from './_components/CourseEnrollSection';
import CourseContentSection from './_components/CourseContentSection';
import { useUser } from '@clerk/nextjs';

function CoursePreview({params}) {

  const {user}= useUser();
const [courseInfo, setCourseInfo]= useState();
const [isUserAlreadyEnrolled,setIsUserAlreadyEnrolled]= useState('')

    useEffect(()=>{
       
        params && getCourseInfoById();
    },[params])

    useEffect(()=>{
      courseInfo&&user&&checkUserEnrollToCourse();
    },[courseInfo,user])
    const getCourseInfoById=()=>{
        GlobalApi.getCourseById(params?.courseid).then(res=>{
         console.log("courselist get courseby id ",res);
         setCourseInfo(res?.courseLists[0]);
       

        })
       }

       const checkUserEnrollToCourse = () => {
        GlobalApi.checkUserEnrolledToCourse(courseInfo?.slug, user.primaryEmailAddress.emailAddress)
  .then(res => {
    console.log("API response:", res);
    if(res?.userEnrollCourses[0]?.id)
    {
      setIsUserAlreadyEnrolled(res?.userEnrollCourses[0]?.id);
    }
    
   
  })
  

      };
      
    
  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
        <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo={courseInfo}/>
           
        </div>
        <div>
   <CourseEnrollSection
   isUserAlreadyEnrolled={isUserAlreadyEnrolled}
   courseInfo={courseInfo}/>
   <CourseContentSection
   isUserAlreadyEnrolled={isUserAlreadyEnrolled}
   courseInfo={courseInfo}/>
        </div>
    </div>
  )
}

export default CoursePreview