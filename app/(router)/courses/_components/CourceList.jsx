'use client'
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CourseItem from './CourseItem'
import Link from 'next/link'


function CourceList() {
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        getAllCourses();
    }, []);
    const getAllCourses = () => {
        GlobalApi.getAllCourseList().then(res => {
            console.log("get all course",res);
            setCourseList(res?.courseLists)
        })
    }
    return (
        <div className='p-5 bg-white rounded-lg mt-5'>

            <div className='flex items-center justify-between mb-5 '>
                <h2 className='text-[20px] font-bold text-primary'>All Courses</h2>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">All</SelectItem>
                        <SelectItem value="dark">Paid</SelectItem>
                        <SelectItem value="system">Free</SelectItem>
                    </SelectContent>
                </Select>

            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3  '>
                {
                    courseList?.length > 0 ? courseList.map((item, index) => (
                        <Link href={'/course-preview/'+item.slug}>
                            <div key={index}>

                                <CourseItem course={item} />
                            </div>
                        </Link>
                    )) :
                        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                            <div key={index} className='w-full h-[230px]
                        rounded-xl m-2  bg-slate-200 animate-pulse'>

                            </div>
                        ))
                }
            </div>

        </div>
    )
}

export default CourceList