"use client"
import { Trash2 } from "lucide-react";
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AppliedJobs = () => {

    const [myApplications,setMyApplications] =useState([]); 
    const userInfo=useSelector(item=>item.userInformation);

    const [openImage,setOpenImage]=useState(false);
    const handleOpenImage=()=>{
        setOpenImage(!openImage);
    }

    const getAllApplications=async()=>{
        let res= await fetch(`${process.env.API}/application/getAllApplications/${userInfo?._id}`);
        res = await res.json();
        setMyApplications(res);
        
    }

    useEffect(()=>{
        if(userInfo){
            getAllApplications()
        }
    },[userInfo])

    const handleDeleteApplication=async(jobId)=>{
        let res= await fetch(`${process.env.API}/application/deleteUserApplication/${jobId.jobID}/${jobId._id}/${userInfo._id}`);
        const status=res.status;
        res= await res.json();
        if(status===201){
            toast.success(res);
            getAllApplications();
        }else{
            toast.error(res);
        }
    }

  return (
    <div className=" p-6">
        <h1 className=" font-bold text-3xl">My Applicatons</h1>
        
        {
            myApplications.length > 0 ? (
                myApplications.map((item)=>{
                    return(
                        <div key={item._id} className=" mt-8 bg-slate-100 flex justify-between flex-col md:flex-row items-center mb-4 p-3 rounded-lg shadow-lg gap-3">
                            <div className=" flex flex-col gap-3 text-xs md:text-sm">
                                <div className=" flex items-center gap-2 text-xl">
                                    <h1>Job Title:</h1>
                                    <span className=" font-bold text-green-600">{item.jobID.title}</span>
                                </div>
                                <div className=" flex items-center gap-2 text-sm">
                                    <h1>Job Category:</h1>
                                    <span className=" font-bold text-green-600">{item.jobID.category}</span>
                                </div>
                                <div className=" flex items-center gap-2 text-xl">
                                    <h1>Job Salary:</h1>
                                    <span className=" text-green-600 font-bold">&#8377;. {item.jobID.salary}/-</span>
                                </div>
                                <div className=" flex items-center gap-2 text-xl">
                                    <h1>Job Deadline:</h1>
                                    <span className=" text-green-600 font-bold">{item.jobID.deadline}</span>
                                </div>
                                <div className=" flex items-center gap-2 text-xl">
                                    <h1>Job Type:</h1>
                                    <span className=" text-green-600 font-bold">{item.jobID.jobType}</span>
                                </div>
                                <div className=" flex items-center gap-2 text-xl">
                                    <h1>Location:</h1>
                                    <span className=" text-green-600 font-bold">{item.jobID.location.slice(0,20)}</span>
                                </div>
                                
                            </div>
                            <div>
                                <Image src={item.resume || "/resume.jpg"} alt="resume" height={150} width={150} onClick={handleOpenImage} className=" cursor-pointer" />
                            </div>
                            <div>
                                <button className=" bg-red-600 rounded-md p-2 cursor-pointer text-white" onClick={()=>{
                                    handleDeleteApplication(item)
                                }}><Trash2  /></button>
                            </div>
                        </div>
                    )
                })
            )
            :
            (
                <h1 className=" text-3xl text-red-700 font-bold text-center mt-6">No Applications yet</h1>
            )
        }

        {
            openImage && (
                <div className=" absolute z-50 top-0 left-0   backdrop-blur-sm flex flex-col items-center justify-center w-full">
                    <Image onClick={handleOpenImage} src="/resume.jpg" alt="resume" height={450} width={500}  className=" cursor-pointer h-[700px] w-[600px]" />
                </div>
            )
        }
    </div>
  )
}

export default AppliedJobs