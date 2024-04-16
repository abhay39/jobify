"use client"
import JobCard from "@/components/JobCard"
import JobMainCard from "@/components/JobMainCard"
import SidebarFilters from "@/components/SidebarFilters"
import { useEffect, useState } from "react"

const FindJobs = () => {
  const [allJobs,setAllJobs]=useState([]);

  const getAllJobs=async()=>{
    let res= await fetch(`${process.env.API}/jobs/allJobs`);
    res = await res.json();
    setAllJobs(res)
  }

  useEffect(()=>{
    getAllJobs();
  },[])

  return (
    <main className="  flex bg-slate-100 min-h-screen gap-6 p-3 ">
        <div className=" w-1/4 hidden lg:flex sticky 0 left-0">
            <SidebarFilters />
        </div>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full p-4">
            {
              allJobs.length>0 ? (
                allJobs.map((item)=>{
                  return(
                    <JobMainCard item={item} key={item._id}/>
                  )
                })
              ) : (
                <h1>No Jobs to show</h1>
              )
            }
            
        </div>
    </main>
  )
}

export default FindJobs