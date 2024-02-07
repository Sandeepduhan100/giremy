'use client'
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const router = useRouter();
  const {user,isLoaded} =useUser();

  useEffect(()=>{
    user&&checkUserMembership();
    if(user){
      router.push("/dashboard")
    }
    else{
      isLoaded&&router.push("/courses")
    }
  },[user]);
  const checkUserMembership=(email)=>{
GlobalApi.checkForMembership(user?.primaryEmailAddress.emailAddress).then(res=>{
  console.log(res);

  if(res.memberships?.length >0 ){

    console.log("its member");
  }
})
  }
  return (
  <div>
     <UserButton afterSignOutUrl="/sign-in"/>
  </div>
  );
}
