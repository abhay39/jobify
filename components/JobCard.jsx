import { BookmarkCheck } from 'lucide-react';
import Image from 'next/image';

const JobCard = () => {
    
    const now=new Date();
  let time =now.toLocaleTimeString('en-IN',{
    hour:'2-digit',
    minute:'2-digit',
  });
  let date=(new Intl.DateTimeFormat('en-IN',{
    dateStyle:'full'
  })).format(now);

  return (
    <div className=" rounded-lg p-4 bg-[#F9F6FE] flex flex-col gap-3 w-full">
        <BookmarkCheck size={18} className=' cursor-pointer'/>
        <h1 className=' font-bold text-2xl'>Sr. Software Developer</h1>
        <div className=' flex items-center justify-between'>
            <span>Exp: <span className=' font-semibold'> 3 Yrs.</span> </span>
            <span>Salary:<span className=' font-semibold'> $90k/Yrs.</span></span>
        </div>
          <p className=' text-sm'>Job Type: <span className=' font-semibold'> {"Internship"}</span></p>
        
          <p className=' text-sm'>Deadline: <span className=' font-semibold'> {date}</span></p>
        
        <div className=' bg-white p-2 flex items-center justify-between rounded-md'>
            <div className=' flex items-center gap-3'>
                <Image src="/nike.jpg" alt='nike logo' height={50} width={50} className=' rounded-full object-cover'/>
                <div>
                    <h1 className=' font-bold'>Nike India</h1>
                    <p className=' text-xs text-gray-500'>{date}</p>
                </div>
            </div>
            <button className=' bg-[#FF70C1] p-2 rounded-xl px-4 text-white font-semibold'>View</button>
        </div>
    </div>
  )
}

export default JobCard