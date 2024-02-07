'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import axios from 'axios'
import Script from 'next/script';
import React, { useState } from 'react'
import { toast } from 'sonner';


function GiremyPro() {
    const {user}= useUser();
    const [subscriptionId, setSubscriptionId]=useState(null);


    const createSubscription = async (planId)=>{
        axios.post("/api/create-subscription",JSON.stringify({
            plan_id:planId
    })).then(res=>{
        console.log('hj',res.data);
        setSubscriptionId(res.data.id);
        makePayment();
    })

    }

    const makePayment=()=>{
        const options={
            key:process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
            subscription_id:subscriptionId,
            name:'GIREMY',
            description:'GIREMY pro membership',
            handler: async (res)=>{
                console.log("whichh",res);

                if(res){
                    addNewMember(res?.razorpay_payment_id)
                }
            },
            theme:{
                color:"#7D41E1"
            }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const addNewMember=(paymentId)=>{
        GlobalApi.addNewMember(user.primaryEmailAddress.emailAddress,paymentId).then(res=>{
            console.log(res);
            if(res){
                toast('Payment Successfull !!!')
            }
        },
        (error)=>{
            toast('Some error happen')
        })
    }
  return (
    <div>
        <Script
        id='razorpay-checkout-js'
        src='https://checkout.razorpay.com/v1/checkout.js'></Script>
        <div className="mx-auto max-w-3xl px-2 py-2 sm:px-4 sm:py-12 lg:px-8 lg:py-14">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
                <div className="rounded-2xl border border-gray-200 p-6 hover:border-primary cursor-pointer bg-white shadow-sm sm:px-4 lg:p-12">


                        <div className="text-center flex flex-col gap-4">
                            <h2 className='text-lg font-medium text-gray-900'>
                                Monthly

                            </h2>
                            <h1 className='text-3xl'>399💲 <span className='text-sm'>monthly</span></h1>
                            <p>✔ Access all course</p>
                            <p>✔ Free Source code</p>
                            <p>✔ Free App Membership</p>
                            <p>✔ Email and Instagram dm support</p>

                            <Button onClick={()=>createSubscription("plan_NXfvTCyK40V9Mu")}>Get Started</Button>
                        </div>
                       
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 hover:border-primary cursor-pointer bg-white shadow-sm sm:px-4 lg:p-12">


                <div className="text-center flex flex-col gap-4">
                            <h2 className='text-lg font-medium text-gray-900'>
                                Yearly

                            </h2>
                            <h1 className='text-3xl' >999💲 <span className='text-sm'>yearly</span></h1>
                            <p>✔ Access all course</p>
                            <p>✔ Free Source code</p>
                            <p>✔ Free App Membership</p>
                            <p>✔ Email and Instagram dm support</p>

                            <Button onClick={()=>createSubscription("plan_NXfw6k8pEuuiFT")}>Get Started</Button>
                        </div>
                       
                </div>


            </div>
        </div>
    </div>
  )
}

export default GiremyPro