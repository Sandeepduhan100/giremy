import Image from 'next/image'
import React from 'react'

function CourseItem({course}) {
  return (
    <div  className='border rounded-xl hover:shadow-md
    hover:shadow-purple-400 cursor-pointer'>
<Image className='rounded-t-lg' src={course?.banner.url}alt='banner' width={500} height={90} />
    
    <div className='flex flex-col gap-1 p-2'>
        <h2 className='font-bold'>{course.name}</h2>
        <h3 className='text-[12px] text-gray-500'>{course.author}</h3>
       {course?.chapter?.length==0 ? <div className='flex gap-2'>
            <Image src='/youtube.png' alt='youtube' width={20} height={20} />
            <h2>watch on youtube</h2>
        </div> :
        <div className='flex gap-2'>
            <Image src='/chapter.png' alt='chapter' width={20} height={20} />
            <h2>Read the chapter</h2>
        </div>}
        <h2>{course?.free?'Free':'Paid'}</h2>

    </div>
    </div>
  )
}

export default CourseItem