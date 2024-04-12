"use client"
import LandingPage from "@/pages/LandingPage";
import { userDetailsActions } from "@/store/userSlice"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";


export default function Home() {
  const dispatch=useDispatch();
  const [token,setTOken]=useState(null)
  
  useEffect(() => {
    const getToken = Cookies.get('token');
    setTOken(getToken)
    if (getToken) {
      
      const getDetails = async () => {
        let res = await fetch(`${process.env.API}/auth/getUserDetails/${getToken}`);
        res = await res.json();
       dispatch(userDetailsActions.getUserDetails(res))
      }
      getDetails();
    }
  }, [token]);

  const router=useRouter();

  return (
    <main className=" px-6 py-6 md:px-8 lg:px-12">
      {
        token?(
          router.push("/home")
        ):(<LandingPage />)
      }
    </main>
  );
}
