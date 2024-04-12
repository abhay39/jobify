"use client"
import Link from 'next/link';
import Image from 'next/image';
import {Zap,User,Mail,Lock} from 'lucide-react'
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';


const SignIn = () => {
  const router=useRouter();
  const [isSignIn,setIsSignIn]=useState(false);
  const [info,setInfo]=useState({
    role:'',
    email:'',
    password:'',
  })

  const handleChange=(e)=>{
    setInfo({
      ...info,
      [e.target.name]:e.target.value
    })
  }

  const handleLogin=async()=>{

    if(!info.email || !info.password || !info.role){
      toast.error("Please enter a details!!")
    }

    try{  
      setIsSignIn(true)
      let res= await fetch(`${process.env.API}/auth/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(info)
      })
      const status=res.status;
      setIsSignIn(false);
      res= await res.json()
      if(status===201){
        Cookies.set("token",res);
        // console.log(res)
        toast.success("Login successful!!");
        router.replace("/home")
      }else{
        toast.error(res)
        // console.log(res)
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <main className=" min-h-screen flex ">
      <section className=' w-full lg:1/2 flex items-center justify-center flex-col px-6'>
        <Link href="/" className=' flex items-center cursor-pointer gap-3'>
              <div className=' bg-[#119756] p-2 text-white rounded-full'>
                  <Zap size={30}/>
              </div>
              <div>
                  <h1 className=' font-extrabold text-3xl text-[#084527]'>Jobify</h1>
                  <p className=' text-xs font-light'>Find Your first job</p>
              </div>
          </Link>
          <h1 className=' font-bold mt-3 text-2xl'>Login to your account</h1>

          <div className=' w-[70%] mt-4 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Login As</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
              <select onChange={handleChange} name='role'  className=' w-full bg-slate-500 text-sm  p-3 rounded-md outline-none text-white'>
                <option value=''>Select Role</option>
                <option value='Admin'>Admin</option>
                <option value='Job Seeker'>Job Seeker</option>
                <option value='Company'>Company</option>
              </select>
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <User />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-4 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Email Address</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
              <input onChange={handleChange} type="email" name="email" placeholder="abhay@gmail.com" className=' w-full bg-slate-500 text-white text-sm  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Mail />
              </div>
            </div>
          </div>

          <div className='  w-[70%] mt-4 '>
            <label htmlFor="" className='text-left text-sm font-semibold'>Password</label>
            <div className=' flex bg-slate-500 rounded-md items-center w-full'>
            <input onChange={handleChange} type="password" name="password" placeholder='your password' className=' w-full bg-slate-500 text-sm text-white  p-3 rounded-md outline-none' id="" />
              <div className=' bg-[#145247] p-2 rounded-md text-white'> 
                <Lock />
              </div>
            </div>
          </div>

          <button onClick={handleLogin} className=' bg-[#145247] mt-3 rounded-md p-3 text-white font-bold  w-[70%]'>Login</button>

          <Link href="/register" className=' border-2 border-[#145247] text-center mt-3 rounded-md font-bold p-3 text-black  w-[70%]'>Register Now</Link>

      </section>

      <section className='w-full hidden lg:flex  items-center justify-center'>
        <Image src="/login.png" alt='login' width={500} className=' '  height={500} />
      </section>

      {
        isSignIn && (
          <div class="flex flex-col justify-center items-center h-screen absolute top-0 left-0 backdrop-blur-sm w-full">
            <div class=" loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            <h1 className=' font-bold mt-2 text-2xl text-red-700'>Authenicating...</h1>
          </div>
        )
      }

    </main>
  )
}

export default SignIn