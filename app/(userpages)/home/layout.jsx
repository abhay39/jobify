"use client"
import HomePageNavsForCompany from "@/components/HomePageNavsForCompany";
import HomePageNavs from "@/components/HomePageNavsForUser"
import { userDetailsActions } from "@/store/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const layout = ({children}) => {

  const dispatch=useDispatch();
  const userInfo=useSelector(item=>item.userInformation);
  const router=useRouter()
  

  const [token,setTOken]=useState(null)
  const [loadingValues, setLoadingValues]=useState(false);
  
  useEffect(() => {
    const getToken = Cookies.get('token');
    setTOken(getToken)
    if (getToken) {
      setLoadingValues(true)
      const getDetails = async () => {
        let res = await fetch(`${process.env.API}/auth/getUserDetails/${getToken}`);
        res = await res.json();
       dispatch(userDetailsActions.getUserDetails(res))
      }
      getDetails();
      setLoadingValues(false);
    }else{
      toast.error("Not Authorized");
      router.push("/")
    }
  }, [token,dispatch]);

  return (
    <main className=" px-6 md:px-10 lg:px-16 ">
      
      {
        loadingValues ? (
          <div class="flex flex-col justify-center items-center h-screen absolute top-0 left-0 backdrop-blur-sm w-full">
            <div class=" loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            <h1 className=' font-bold mt-2 text-2xl text-red-700'>Loading Info</h1>
          </div>
        ) : (
          <>
            <nav className=" sticky top-0 bg-white z-50">
              {
                userInfo?.role==='Job Seeker' ? (
                  <HomePageNavs />
                ):(
                  <HomePageNavsForCompany />
                )
              }
            </nav>
            {children}
          </>
        )
      }
    </main>
  )
}

export default layout