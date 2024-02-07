'use client'
import { UserMemberContext } from '@/app/_context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { toast } from "sonner"
function CourseEnrollSection({courseInfo,isUserAlreadyEnrolled}) {
  const {user} = useUser();
  const {isMember,setIsMember}=useContext(UserMemberContext)

  const router = useRouter();

  useEffect(()=>{
    console.log("isUserAlreadyEnrolled",isUserAlreadyEnrolled);
  })

  const onEnrollCourse =()=>{
    GlobalApi.enrollToCourse(
      courseInfo?.slug,user?.primaryEmailAddress?.emailAddress).then(res=>{
      console.log("courseenrol log",res);


if(res){
  toast("User Enroll Successfull", {
    description: "user enroll to this course",
   
  })

  router.push('/watch-course/'+res.createUserEnrollCourse.id)

}
    })
  }

    // const membership=false;
  return (
    <div className='p-3 text-center rounded-sm bg-primary '>
        <h2 className='text-[22px] font-bold text-white'>
            Enroll to the Course</h2>
            


           {user&&(isMember||courseInfo.free)&&!isUserAlreadyEnrolled ? <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>Enroll Now to Start Learning and Building Projects</h2>
            <Button className="bg-white text-primary hover:bg-white
             hover:text-primary"
             onClick={()=>onEnrollCourse()}
             >Enroll Now</Button>
            </div>
            : !user ?  <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>Enroll Now to Start Learning and Building Projects</h2>
            <Link href='/sign-in'><Button className="bg-white text-primary hover:bg-white
             hover:text-primary">Enroll Now</Button></Link>
            </div>
            : !isUserAlreadyEnrolled &&<div className='flex flex-col gap-3 mt-3'>
<h2 className='text-white font-light'>Buy Monthly and Get Access to All Courses </h2>
            <Button className="bg-white text-primary hover:bg-white
             hover:text-primary">Buy MemberShip Just $2.99</Button>
            </div>}
          {isUserAlreadyEnrolled && <div className='flex flex-col gap-3 mt-3'>
<h2 className='text-white font-light'>
  Continue toe learn Your Project
</h2>
           <Link href={'/watch-course/'+isUserAlreadyEnrolled}> <Button className="bg-white text-primary hover:bg-white
             hover:text-primary">Continue</Button></Link>
            </div>}
    </div>
  )
}

export default CourseEnrollSection