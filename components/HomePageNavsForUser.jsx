"use client"
import { userNavs } from '@/assets/navs';
import Cookies from 'js-cookie';
import { Zap, ArrowRight,AlignJustify,Minimize2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname,useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const HomePageNavs = () => {
    const pathName=usePathname();
    const userInfo=useSelector(item=>item.userInformation);
    const router=useRouter()

    const [openNav,setOpenNav]=useState(false);
    const [openLogout,setOpenLogout]=useState(false);

    const handleOpen=()=>{
        setOpenNav(!openNav);
    }

    const handleLogout=()=>{
        Cookies.remove("token");
        toast.success("Logged out Successfully!!")
        router.push("/")
    }

    
  return (
    <nav className=" flex items-center mt-3 justify-between">
        <Link href="/" className=' flex items-center cursor-pointer gap-3'>
            <div className=' bg-[#119756] p-2 text-white rounded-full'>
                <Zap size={30}/>
            </div>
            <div>
                <h1 className=' font-extrabold text-3xl text-[#084527]'>Jobify</h1>
                <p className=' text-xs font-light'>Find Your first job</p>
            </div>
        </Link>

        {/* navbars */}

        <div className=' hidden lg:flex'>
            <ul className=' flex gap-5 font-semibold items-center'>
                {
                    userNavs.map((item,index)=>{
                        return(
                            <li key={index}>
                                <Link className={`${pathName===item.route?"text-green-600":"text-gray-400"}`} href={item.route}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

        {/* auths */}
        <div className='flex  cursor-pointer  p-2 rounded-md duration-700 ease-out items-center gap-3 '>
            <div className='hidden md:flex  cursor-pointer hover:bg-slate-200 p-2 rounded-md duration-700 ease-out items-center gap-3 ' onClick={()=>setOpenLogout(true)}>
                <Image src={userInfo?.profilePicture || "/me.jpg"} className=' rounded-full object-cover w-[45px] h-[45px] ' alt='logo' height={40} width={40} />
                <div>
                    <h1 className=' font-bold text-xl'>{userInfo?.name || "Loading...."}</h1>
                    <p className=' text-sm text-slate-400 '>{userInfo?.role || "Job Seeker"}</p>
                </div>
            </div>
            <div onClick={handleOpen} className=' lg:hidden cursor-pointer'>
                <AlignJustify  />
            </div>
        </div>



        {/* small devices */}
        {
            openNav && (
                <div className=' absolute top-0 right-0 px-6 py-12 min-h-screen w-full md:w-[350px] bg-gray-300'>
                    <div onClick={handleOpen} className=' p-2 bg-slate-700 text-white rounded-full absolute top-2 right-2 cursor-pointer'>
                        <Minimize2 />
                    </div>
                    <ul className=' flex flex-col gap-12 justify-start  font-semibold items-start'>
                        {
                            userNavs.map((item,index)=>{
                                return(
                                    <li key={index}>
                                        <Link className={`${pathName===item.route?"text-green-600":"text-gray-400"}`} href={item.route}>
                                            {item.name}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className='  md:hidden gap-3 mt-6'>
                        <div className='flex  cursor-pointer hover:bg-slate-200 p-2 rounded-md duration-700 ease-out items-center gap-3 '>
                            <Image src={userInfo?.profilePicture || "/me.jpg"} className=' rounded-full object-cover w-[45px] h-[45px] ' alt='logo' height={40} width={40} />
                            <div>
                                <h1 className=' font-bold text-xl'>{userInfo?.name || "Loading...."}</h1>
                                <p className=' text-sm text-slate-400 '>{userInfo?.role || "Job Seeker"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
        {
            openLogout && (
                <div className=' absolute top-0 left-0 w-full flex items-center flex-col justify-center backdrop-blur-sm min-h-screen'>
                    <div className=' p-6 rounded-md bg-white text-center'>
                        <h1 className=' text-3xl mb-2 font-bold'>Do you really wanna logout?</h1>
                        <div className=' flex gap-2 '>
                            <button onClick={handleLogout} className=' bg-green-500 text-white p-2 rounded-md w-[300px]'>Yes</button>
                            <button onClick={()=>setOpenLogout(false)} className=' border-2 border-slate-700 p-2 rounded-md w-[300px]'>No</button>

                        </div>
                    </div>
                </div>
            )
        }

    </nav>
  )
}

export default HomePageNavs