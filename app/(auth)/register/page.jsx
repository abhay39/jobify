"use client"
import Link from 'next/link';
import Image from 'next/image';
import {Zap,User,Mail,Lock,Edit,Phone } from 'lucide-react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const Register = () => {

  const [info,setInfo]=useState({
    name:'',
    email:'',
    password:'',
    role:'',
    phoneNumber:'',
    profilePicture:'',
  })
  const [isLoading,setIsLoading]=useState(false)
  const [openVerify,setOpenVerify]=useState(false)
  const [otp,setOTP]=useState(null)
  const router=useRouter();

  const handleChange=(event)=>{
    setInfo({
     ...info,
      [event.target.name]:event.target.value
    })
  }

  const handleRegister=async(e)=>{
    e.preventDefault();
    // console.log(process.env.API)
    let res= await fetch(`${process.env.API}/auth/register`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(info)
    })
    const status=res.status;
    res= await res.json()
    if(status===201){
      toast.success(res);
      setOpenVerify(true);
    }else{
      toast.error(res.message)
    }
  }

  const verifyDetails=async(e)=>{
    e.preventDefault();
    // console.log(process.env.API)
    let res= await fetch(`${process.env.API}/auth/verifyAccount`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email:info.email,
        otp:otp
      })
    })
    const status=res.status;
    res= await res.json()
    console.log(res);
    if(status===201){
      toast.success(res.message);
      Cookies.set("token",res.token);
      router.replace("/");
    }else{
      toast.error(res.message)
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
      profilePicture:response.secure_url
    })
  }

    return (
      <main className=" min-h-screen flex ">
      <section className=' w-full lg:1/2 flex items-center justify-center flex-col px-6'>
        <Link href="/" className=' flex items-center cursor-pointer gap-3'>
              <div className=' bg-[#119756] p-2 text-white rounded-full'>
                  <Zap size={30} />
              </div>
              <div>
                  <h1 className=' font-extrabold text-3xl text-[#084527]'>Jobify</h1>
                  <p className=' text-xs font-light'>Find Your first job</p>
              </div>
          </Link>
          <h1 className=' font-bold mt-3 text-2xl'>Create a new account</h1>

          <div className=' w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Register As</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
              <select onChange={handleChange} name='role'   className=' w-full bg-slate-500 text-sm  p-3 rounded-md outline-none text-white'>
                <option value=''>Select Role</option>
                <option value='Job Seeker'>Job Seeker</option>
                <option value='Company'>Company</option>
              </select>
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <User />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Name</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
              <input  onChange={handleChange} type="text" name="name" placeholder="Abhay Kumar Gupta" className=' w-full bg-slate-500 text-white text-sm  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Edit />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Email Address</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
              <input onChange={handleChange} type="email" name="email" placeholder="abhay@gmail.com" className=' w-full bg-slate-500 text-white text-sm  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Mail />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Phone Number</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
            <input onChange={handleChange} type="number" name="phoneNumber" placeholder='9876543210' maxLength={10} className=' w-full bg-slate-500 text-sm text-white  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Phone  />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Password</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
            <input onChange={handleChange} type="password" name="password" placeholder='your password' className=' w-full bg-slate-500 text-sm text-white  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Lock />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-2 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Profile Picture</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
            <input onChange={handlePhotoUpload} type="file" accept='image/*' name="" placeholder='your password' className=' w-full bg-slate-500 text-sm text-white  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <User />
              </div>
            </div>
          </div>

          <button onClick={handleRegister} className=' bg-[#145247] mt-3 rounded-md p-3 text-white font-bold  w-[70%]'>Register</button>
          <Link href="/signin" className=' border-2 border-[#145247] text-center mt-3 rounded-md font-bold p-3 text-black  w-[70%]'>Login</Link>

      </section>

      {
        isLoading && (
          <div class="flex flex-col justify-center items-center h-screen absolute top-0 left-0 backdrop-blur-sm w-full">
            <div class=" loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            <h1 className=' font-bold mt-2 text-2xl text-red-700'>Uploading</h1>
          </div>
        )
      }

      {
        openVerify && (
          <div class="flex flex-col justify-center items-center h-screen absolute top-0 left-0 backdrop-blur-sm w-full">
            <div className=' bg-white p-6 flex items-center justify-center flex-col        rounded-md w-[80%]'>
                <h1 className=' text-2xl font-extrabold'>Verify Account</h1>
                <div className='  w-full mt-2 '>
                  <label htmlFor="" className='text-left text-sm font-semibold'>Email Address</label>
                  <div className=' flex bg-slate-500 rounded-md items-center w-full'>
                    <input value={info.email} readOnly onChange={handleChange} type="email" name="email" placeholder="abhay@gmail.com" className=' w-full bg-slate-500 text-white text-sm  p-3 rounded-md outline-none' id="" />
                    <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                      <Mail />
                    </div>
                  </div>
                </div>

                <div className='  w-full mt-2 '>
                  <label htmlFor="" className='text-left text-sm font-semibold'>OTP</label>
                  <div className=' flex bg-slate-500 rounded-md items-center w-full'>
                    <input  onChange={(e)=>{
                      setOTP(e.target.value)
                    }} type="text" name="otp" placeholder="4uE78K" className=' w-full bg-slate-500 text-white text-sm  p-3 rounded-md outline-none' id="" />
                    <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                      <Mail />
                    </div>
                  </div>
                </div>
                <button onClick={verifyDetails} className=' bg-[#145247] mt-3 rounded-md p-3 text-white font-bold  w-full'>Verify</button>
            </div>
          </div>
        )
      }

      <section className='w-full hidden lg:flex  items-center justify-center'>
        <Image src="/register.png" alt='login' width={600} className=' '  height={600} />
      </section>
    </main>
    )
  }
  
  export default Register