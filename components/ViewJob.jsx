
"use client"
import { MessageCircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ViewJob = ({currentJobs,hadleViewJob}) => {
    const [details,setDetails]=useState([])

    const getCurrentJobDetails=async()=>{
        let res= await fetch(`${process.env.API}/jobs/allJobs/getCurrentCompanyJobs/getApplicationsOfCurrentJob/${currentJobs._id}`);
        res = await res.json();
        setDetails(res);
    }

    const [openImage,setOpenImage]=useState(false);
    const handleOpenImage=()=>{
        setOpenImage(!openImage);
    }

    useEffect(()=>{
        getCurrentJobDetails()
    },[currentJobs])

  return (
    <section className=" min-h-screen  backdrop-blur-md p-4 md:p-6 lg:p-10">
        <p className=" absolute top-3  right-4 cursor-pointer" onClick={hadleViewJob}><MessageCircleX /></p>
        <h1 className=" text-2xl md:text-3xl lg:text-4xl text-green-600 font-bold text-center">Total Applicants</h1>

        {
            details.length>0 ? (
                details.map((item)=>{
                    return(
                        <div key={item._id} className=" mt-8 bg-slate-100 flex justify-between flex-col md:flex-row items-center mb-4 p-3 rounded-lg shadow-lg gap-3">
            <div className=" flex flex-col gap-3 text-xs md:text-sm">
                <div className=" flex items-center gap-2 ">
                    <h1>Applicant Name:</h1>
                    <span className=" font-bold text-green-600">{item.name}</span>
                </div>
                <div className=" flex items-center gap-2  ">
                    <h1>Applicant Email:</h1>
                    <span className=" font-bold text-green-600">{item.email}</span>
                </div>
                <div className=" flex items-center gap-2 ">
                    <h1>Applicant Number:</h1>
                    <span className=" text-green-600 font-bold">{item.phone}</span>
                </div>
                <div className=" flex items-center gap-2 ">
                    <h1>Applicant Location:</h1>
                    <span className=" text-green-600 font-bold">{item.address}</span>
                </div>
                <div className=" flex gap-2 ">
                    <h1>Applicant Type:</h1>
                    <span className=" text-green-600 font-bold">{item.coverLetter.slice(0,100)}</span>
                </div>
                
                
            </div>
            <div>
                <Image onClick={handleOpenImage} src={item.resume || "/resume.jpg"} alt="resume" height={150} width={150}  className=" cursor-pointer" />
            </div>
            
        </div>
            )
                }
            )
        ) : (
            <h1 className="text-xl font-bold text-center flex items-center justify-center h-48">No Applications yet</h1>
        )
        }

        {
            openImage && (
                <div className=" absolute   top-0 left-0   backdrop-blur-sm flex flex-col items-center justify-center w-full">
                    <Image onClick={handleOpenImage} src="/resume.jpg" alt="resume" height={450} width={500}  className=" cursor-pointer h-[700px] w-[600px]" />
                </div>
            )
        }
    </section>
  )
}

export default ViewJob