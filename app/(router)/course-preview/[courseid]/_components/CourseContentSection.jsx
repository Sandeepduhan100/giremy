import { Lock, Play } from 'lucide-react'
import React, { useState } from 'react'

function CourseContentSection({courseInfo,isUserAlreadyEnrolled,watchMode=false,setActiveChapterIndex,compltedChapter}) {
    const [activeIndex, setActiveIndex]=useState(0);

const checkIsChapterCompleted=(chapterId)=>{
  console.log("lop",compltedChapter);
  return  compltedChapter.find(item=>item.chapterId==chapterId)

}



  return (
    <div className='p-3 bg-white rounded-sm mt-3'>

        <h2>Contents</h2>
     {
        courseInfo.chapter?.map((item,index)=>(
            <div>
                <h2 className={`p-2 text-[14px] flex justify-between 
                border rounded-sm px-4 m-2 hover:bg-gray-200 
                hover:text-gray-500 cursor-pointer items-center
                ${activeIndex==index&&'bg-primary text-white'}
                ${isUserAlreadyEnrolled&&'hover:bg-primary hover:text-white'}
                ${watchMode&&checkIsChapterCompleted(item.id)&&'border-green-600 bg-green-200'}`
                 }
                onClick={()=>{watchMode&&setActiveChapterIndex(index);
                  watchMode&&setActiveIndex(index)
                }}
                > 
                
                {index+1}. {item.name}
                {activeIndex==index||isUserAlreadyEnrolled?
                <Play className='h-4 w-4'/>: <Lock className='h-4 w-4'/>}
               </h2>
            </div>
        ))
     }
    </div>
  )
}

export default CourseContentSection