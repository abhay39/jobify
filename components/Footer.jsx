import { Zap, ArrowRight,AlignJustify,Minimize2,Facebook,Instagram,Linkedin,Github  } from 'lucide-react';
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>

    
    <nav className=" mt-12 flex lg:flex-row flex-col items-center justify-between">
        <Link href="/" className=' flex mb-4 md:mb-8 lg:mb-0 items-center cursor-pointer gap-3'>
            <div className=' bg-[#119756] p-2 text-white rounded-full'>
                <Zap size={30}/>
            </div>
            <div>
                <h1 className=' font-extrabold text-3xl text-[#084527]'>Jobify</h1>
                <p className=' text-xs font-light'>Find Your first job</p>
            </div>
        </Link>

        {/* navbars */}

        <div className=' '>
            <ul className=' flex gap-5 font-semibold text-xs md:text-sm items-center'>
                <Link href="/">Jobs</Link>
                <Link href="/">Resources</Link>
                <Link href="/">Employers</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact Us</Link>
            </ul>
        </div>

        {/* social media */}
        <div className=' flex items-center gap-3 mt-3'>
            <div href="/" className=' border-2 border-gray-400 cursor-pointer rounded-full p-2'>
                <Facebook />
            </div>
            <div href="/" className=' border-2 border-gray-400 cursor-pointer rounded-full p-2'>
                <Instagram />
            </div>
            <div href="/" className=' border-2 border-gray-400 cursor-pointer rounded-full p-2'>
                <Github  />
            </div>
            <div href="/" className=' border-2 border-gray-400 cursor-pointer rounded-full p-2'>
                <Linkedin />
            </div>
        </div>
    </nav>

    <hr className=' border-gray-300 mt-3'/>
    <div className='flex md:flex-row flex-col gap-3 items-center font-semibold text-xs md:text-sm mt-2 justify-between '>
        <p>
            &copy;2024 Jobify. All right reserveed.
        </p>
        <div className=' gap-4 flex items-center '>
            <Link href="/">
                Terms of Service
            </Link>
            <Link href="/">
                Privacy Policy
            </Link>
            <Link href="/">
                Cookies Policy
            </Link>
            <Link href="/">
                Partners
            </Link>
        </div>
    </div>
    </footer>

  )
}

export default Footer