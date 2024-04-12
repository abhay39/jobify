import Image from 'next/image';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';


const BlogCard = () => {
const now=new Date();
  let time =now.toLocaleTimeString('en-IN',{
    hour:'2-digit',
    minute:'2-digit',
  });
  let date=(new Intl.DateTimeFormat('en-IN',{
    dateStyle:'full'
  })).format(now);

  return (
    <div className=' bg-white   rounded-lg w-full md:w-[330px] pb-3'>
        <div className=' relative linkDiv'>
            <Image alt='blogss' height={300} width={300} src="/learn.jpg" className='cursor-pointer duration-500 ease-in-out h-full w-full mb-3 rounded-lg'/>
            <p className='absolute top-[40%] backdrop-blur-sm p-2 rounded-full bg-slate-500 cursor-pointer text-white text-center left-[50%] opacity-0 transition-opacity duration-700'>
                <Link href="/">
                    <SquareArrowOutUpRight />
                </Link>
            </p>
        </div>
        <div className=' p-2'>
            <p className=' text-xs text-green-600'>{date}</p>
            <h1 className=' font-bold text-2xl'>Understanding the Need for a Carrer Pivot</h1>
            <p className=' text-xs text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil officiis possimus eos ipsam, fuga enim? Incidunt molestias nesciunt consectetur asperiores quibusdam quas minus, aliquam sed illum velit, dolor quae aspernatur.</p>
        </div>
    </div>
  )
}

export default BlogCard