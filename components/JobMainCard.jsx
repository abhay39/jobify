"use client"
import { Star,BookmarkCheck, History } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'



const JobMainCard = ({item}) => {
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')
  
  const router=useRouter();
  const dateString = item?.createdAt;
  const date = new Date(dateString);

  return (
    <div className=" bg-white w-full h-[330px] flex flex-col gap-3  p-4 rounded-md">
        <div className=" flex items-center justify-between">
           <div className=" flex items-center gap-2">
            <Image src={ item?.company?.profilePicture || "/google.png"} height={40} width={ 50}  alt="compnay logo" className=" rounded-full object-cover w-10 h-10" />
              <div>
                  <h1 className=" font-bold text-[#527765]">{item.title}</h1>
                  <p className="text-xs flex items-center text-gray-500 gap-2">{item?.company?.name} <Star size={12}/> {item.users.length} Applicants</p>
              </div>
           </div>
          <BookmarkCheck size={18} className=" cursor-pointer"/>
        </div>

        <div className=" flex gap-3 mt-3 justify-between">
          <div className=" bg-[#D7EDFB] cursor-pointer p-2 rounded-lg text-blue-600">
            {item?.jobType || "Full-Time"}
          </div>
          <p className=" text-red-600 text-sm flex gap-2 items-center"> Deadline: {item?.deadline} </p>
        </div>

        <p className=" text-gray-400 mb-3 text-sm text-justify mt-2">{item?.description?.slice(0,100)}</p>
        <hr />
        <div className=" mt-3 flex items-center justify-between">
          <h1 className=" font-bold text-[15px]">&#8377;.  {(item?.salary/12).toFixed(2)}/m</h1>
          <p className=" text-slate-400 text-sm flex gap-2 items-center"> <History size={16}/> Posted {timeAgo.format(date)} </p>
        </div>
        
        <button onClick={()=>{
          router.push(`/home/findJobs/${item._id}`)
        }} className=" p-2 rounded-lg bg-green-400 text-white font-semibold">View Job</button>
    </div>
  )
}

export default JobMainCard