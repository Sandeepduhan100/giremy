'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CourseVideoDescription from '../../course-preview/[courseid]/_components/CourseVideoDescription';
import CourseContentSection from '../../course-preview/[courseid]/_components/CourseContentSection';
import { toast } from 'sonner';

function WatchCourse({params}) {
  const {user}= useUser();
  const [courseInfo,setCourseInfo]=useState([]);
  const [compltedChapter,setCompletedChapter]=useState([])
  const [activeChapterIndex,setActiveChapterIndex]=useState(0);
useEffect(()=>{
  params&&user&&getUesrEnrolledCourseDetail();
},[params&&user])

  const getUesrEnrolledCourseDetail=()=>{
    GlobalApi.getUserEnrolledCourseDetails(params.enrollid,user.primaryEmailAddress.emailAddress).then(res=>{
      console.log("complted chap",res.userEnrollCourses[0]?.compltedChapter)
      setCompletedChapter(res.userEnrollCourses[0]?.compltedChapter);
      setCourseInfo(res.userEnrollCourses[0].courseList);
    })
  }
const onChapterComplete=(chapterId)=>{
GlobalApi.markChapterCompleted(params.enrollid,chapterId).then(res=>{
  console.log(res);
  if(res){
    toast('Chapter Marked as completed')
    getUesrEnrolledCourseDetail();
  }
})
}

  return courseInfo.name&&(
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
        <div className='col-span-2 bg-white p-3'>
            <CourseVideoDescription courseInfo={courseInfo}
            activeChapterIndex={activeChapterIndex}
            watchMode={true}
            setChapterCompleted={(chapterId)=>{onChapterComplete(chapterId)
            console.log("on mark click",chapterId)}}
            />
           
        </div>
        <div>
  
   <CourseContentSection
   isUserAlreadyEnrolled={true}
   watchMode={true}
   compltedChapter={compltedChapter}
   setActiveChapterIndex={(index)=> setActiveChapterIndex(index)}
   courseInfo={courseInfo}/>
        </div>
    </div>
    </div>
  )
}

export default WatchCourse