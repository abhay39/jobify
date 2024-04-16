"use client"

import { CircleX } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ApplicationForm = ({job,handleOpenApplied}) => {
    const userInfo=useSelector(item=>item.userInformation);

    const [info,setInfo] = useState({
        email:userInfo.email,
        name:userInfo.name,
        address:"",
        phone:userInfo.phoneNumber,
        coverLetter:"",
        resume:"",
        applicantID:userInfo._id,
        companyID:job.company._id,
        jobID:job._id
    })
    const [isLoading,setIsLoading]=useState(false)

    const handleChange=(e)=>{
        setInfo({
           ...info,
            [e.target.name]:e.target.value
        })
    }

    const handleSendApplication=async()=>{
      // console.log(info)
        let res= await fetch(`${process.env.API}/application/submitApplication`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(info)
        })
        const status=res.status;
        res= await res.json()
        console.log(res)
        if(status===201){
            toast.success(res);
            handleOpenApplied()
        }else{
        handleOpenApplied()
        toast.error(res)
        }
    }


    const handlePhotoUpload=async(e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        setIsLoading(true);
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'foodie')
        data.append("cloud_name", "dgml5sbu6")
        let response=await fetch("https://api.cloudinary.com/v1_1/dgml5sbu6/image/upload", {
          method: "POST",
          body: data
        })
        response=await response.json();
        // console.log(response)
        setIsLoading(false)
        setInfo({
          ...info,
          resume:response.secure_url
        })
      }

  return (
    <div className=" flex  items-center min-h-screen justify-center flex-col bg-white">
        <h1 className=" top-3 absolute cursor-pointer right-2" onClick={handleOpenApplied}><CircleX  /></h1>
        <h1 className=" font-bold text-3xl">Application Form</h1>
        <div className=" flex mt-10 items-center  flex-col lg:flex-row w-[70%] gap-3 ">
            <input readOnly value={info.name} onChange={handleChange} name="name" type="text" placeholder=" Enter Full Name" className="outline-none w-full border-b-2"/>
            <input readOnly value={info.email} onChange={handleChange} name="country" type="email" placeholder=" Enter email address" className="outline-none w-full border-b-2"/>
        </div>
        <div className=" flex mt-10 items-center  flex-col lg:flex-row w-[70%] gap-3">
                <input readOnly value={info.phone} onChange={handleChange} name="country" type="number" placeholder=" Enter mobile number" className="outline-none w-full border-b-2"/>
                <input onChange={handleChange} name="address" type="text" placeholder=" Enter Full Address" className="outline-none w-full border-b-2 mt-3 lg:mt-0"/>
        </div>
        <div className=" flex mt-10 items-center flex-col lg:flex-row w-[70%] gap-3">
                <textarea  onChange={handleChange} rows={8} name="coverLetter" type="text" placeholder=" Enter Cover Letter" className="outline-none w-full border-2 p-2 rounded-lg" />
        </div>
        <div className=" flex mt-10 items-center  w-[70%] gap-3 flex-row">
            <label htmlFor="" className=" font-bold ">Select Resume</label>
            <input type="file" onChange={handlePhotoUpload} name="resume" id="" accept="image/*" />
        </div>
        <button onClick={handleSendApplication} className=" bg-green-500 mt-3 font-bold text-white p-2 rounded-md w-[70%]">Send Application</button>

        {
        isLoading && (
          <div class="flex flex-col justify-center items-center h-screen absolute top-0 left-0 backdrop-blur-sm w-full">
            <div class=" loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            <h1 className=' font-bold mt-2 text-2xl text-red-700'>Uploading</h1>
          </div>
        )
      }

    </div>
  )
}

export default ApplicationForm