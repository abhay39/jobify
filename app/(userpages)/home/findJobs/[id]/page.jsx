"use client"
import ApplicationForm from "@/components/ApplicationForm";
import { useEffect, useState } from "react";

const page = ({params}) => {
    const id=params.id;
    const [job,setJob]=useState('')
    const [isAppliedOpen,setSsAppliedOpen]=useState(false)

    const handleOpenApplied=()=>{
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
      setSsAppliedOpen(!isAppliedOpen)
    }
    
    const getAllJobs=async()=>{
      let res= await fetch(`${process.env.API}/jobs/allJobs/${id}`);
      res = await res.json();
      setJob(res)
      // console.log(res)
    }

    useEffect(()=>{
      getAllJobs()
    },[])

    const convertDescriptionToHTML = (description) => {
      // Check if description is defined
      if (!description) return '';
      // Convert Markdown-style formatting to HTML
      const htmlDescription = description
        // Replace double asterisks with <strong> tags
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Replace newline characters with <br> tags
        .replace(/\n/g, '<br>');
      return htmlDescription;
    };

    const res=convertDescriptionToHTML(job?.description)
    
    const getDate=(date)=>{
      if(!date) return;
      const newdate = new Date(date);
      
      return newdate.toLocaleDateString();
    }

  return (
    <div className=" ">
      <div className=" flex items-center h-9 justify-center p-4">
        <h1 className=" font-bold text-4xl text-center mt-4">Job Details</h1>
      </div>
      <div className=" bg-white  p-6 md:p-10">
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Title: </h1>
            <h1 className="">{job?.title}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Category: </h1>
            <h1 className="">{job?.category}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Country: </h1>
            <h1 className="">{job?.country}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">City: </h1>
            <h1 className="">{job?.city}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Location: </h1>
            <h1 className="">{job?.location}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Salary: </h1>
            <h1 className="">&#8377;. {job?.salary}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Job Posted On: </h1>
            <h1 className="">{getDate(job.createdAt)}</h1>
          </div>
          <div className=" flex items-center mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Job Expired On: </h1>
            <h1 className="">{job.deadline}</h1>
          </div>
          <div className=" flex  mb-4 text-[18px] gap-3">
            <h1 className=" text-green-500 font-bold">Description: </h1>
            <div dangerouslySetInnerHTML={{ __html: res }} />
          </div>
          <button onClick={handleOpenApplied} className=" bg-green-500 w-full font-bold text-white p-2 rounded-md">Apply Now</button>
      </div>
      {
        isAppliedOpen && (
          <div className=" fixed top-0 left-0 w-full backdrop-blur-sm z-50">
            <ApplicationForm job={job} handleOpenApplied={handleOpenApplied}/>
          </div>
        )
      }
    </div>
  )
}

export default page