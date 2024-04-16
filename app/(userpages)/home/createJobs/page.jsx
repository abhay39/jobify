"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CreateJobs = () => {
    const userInfo=useSelector(item=>item.userInformation);
    const router=useRouter()

    const [info,setInfo] = useState({
        title:"",
        company:userInfo?._id,
        location:"",
        description:"",
        salary:"",
        deadline:"",
        category:"",
        jobType:"",
        country:"",
        city:""
    })

    const handleChange=(e)=>{
        setInfo({
           ...info,
            [e.target.name]:e.target.value
        })
    }

    const addJob=async()=>{
        
        let res= await fetch(`${process.env.API}/jobs/createJob`,{
            method:"POST",
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(info)
        })
        const status=res.status;
        res= await res.json()
        if(status===201){
            toast.success(res);
            setInfo({
                title:"",
                company:userInfo?._id,
                location:"",
                description:"",
                salary:"",
                deadline:"",
                category:"",
                jobType:"",
                country:"",
                city:""
            })
            router.push("/home")
        }
        else{
            toast.error(res)
        }
    }

  return (
    <div className=" flex p-6 items-center justify-center flex-col">
        <h1 className=" text-2xl lg:text-3xl font-extrabold">POST NEW JOB</h1>

        <div className=" w-full lg:w-[60%] flex flex-col gap-3 items-center justify-center mt-4">
            <div className=" flex items-center flex-col lg:flex-row w-full gap-3">
                <input onChange={handleChange}  name="title" type="text" placeholder=" Enter job Title" className="outline-none w-full border-b-2"/>
                <select name="category" onChange={handleChange}  className="outline-none w-full border-b-2 cursor-pointer mt-3 lg:mt-0">
                <option value=''>Select Category</option>
                <option value='Graphics & Design'>Graphics & Design</option>
                <option value='Mobile App Development'>Mobile App Development</option>
                <option value='Frontend Web Development'>Frontend Web Development</option>
                <option value='MERN Stack Development'>MERN Stack Development</option>
                <option value='Account & Finance'>Account & Finance</option>
                <option value='Video Animation'>Video Animation</option>
                <option value='MEAN Stack Development'>MEAN Stack Development</option>
                <option value='MEVN Stack Development'>MEVN Stack Development</option>
                <option value='Data Entry Operator'>Data Entry Operator</option>
                <option value='Teaching'>Teaching</option>
              </select>
            </div>
            <div className=" flex mt-10 items-center  flex-col lg:flex-row w-full gap-3">
                <input onChange={handleChange} name="country" type="text" placeholder=" Enter Country" className="outline-none w-full border-b-2"/>
                <input onChange={handleChange} name="city" type="text" placeholder=" Enter City" className="outline-none w-full border-b-2 mt-3 lg:mt-0"/>
            </div>
            <div className=" flex mt-10 items-center flex-col lg:flex-row w-full gap-3">
                <input onChange={handleChange} name="location" type="text" placeholder=" Enter Full Location" className="outline-none w-full border-b-2"/>
            </div>
            <div className=" flex mt-10 items-center flex-col lg:flex-row w-full gap-3">
                <input name="deadline" onChange={handleChange} type="date" placeholder=" Enter Deadline" className="outline-none w-full border-b-2"/>
            </div>
            <div className=" flex mt-10 items-center flex-col lg:flex-row w-full gap-3">
                <input onChange={handleChange} name="salary" type="number" placeholder=" Enter Salary" className="outline-none w-full border-b-2"/>
                <select onChange={handleChange} name="jobType"   className="outline-none w-full border-b-2 cursor-pointer mt-3 lg:mt-0">
                <option value=''>Select Job Type</option>
                <option value='Full-Time'>Full-Time</option>
                <option value='Part-Time'>Part-Time</option>
                <option value='Remote'>Remote</option>
                <option value='Internship'>Internship</option>
                <option value='Contracutal'>Contracutal</option>
                <option value='Freelance'>Freelance</option>
              </select>
            </div>
            <div className=" flex mt-10 items-center flex-col lg:flex-row w-full gap-3">
                <textarea name="description" onChange={handleChange} rows={5} type="text" placeholder=" Enter Full Location" className="outline-none w-full border-b-2"/>
            </div>
            <button onClick={addJob} className=" bg-green-700 mt-3 text-white w-full rounded-lg p-2">Post A Job </button>
        </div>
    </div>
  )
}

export default CreateJobs