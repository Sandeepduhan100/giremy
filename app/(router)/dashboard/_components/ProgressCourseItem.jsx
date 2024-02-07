import Image from 'next/image'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'


function ProgressCourseItem({course}) {
const getTotalCompletedChapterPerc=(item)=>
{
const perc = (item?.compltedChapter?.length/item?.courseList?.chapter?.length)*100
return perc
}

  return (
    <Link href={'/course-preview/'+course?.courseList?.slug}>
    <div  className='border rounded-xl hover:shadow-md
    hover:shadow-purple-400 cursor-pointer'>
<Image className='rounded-t-lg' src={course?.courseList.banner?.url}alt='banner' width={500} height={90} />
    
    <div className='flex flex-col gap-1 p-2'>
        <h2 className='font-bold'>{course.courseList.name}</h2>
        <h3 className='text-[12px] text-gray-500'>{course.courseList.author}</h3>
         <h2 className='text-[12px] text-gray-500 mt-3'>  {getTotalCompletedChapterPerc(course)}% 
         <span className='float-right'>{course?.compltedChapter?.length}/{course?.courseList?.chapter?.length} Chapters</span></h2>
        <Progress value={getTotalCompletedChapterPerc(course)} className='h-[7px]' />


    </div>
    </div></Link>
  )
}

export default ProgressCourseItem