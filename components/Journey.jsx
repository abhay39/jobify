import Link from 'next/link';
import BlogCard from './BlogCard';

const Journey = () => {
  return (
    <section className=" min-h-screen flex flex-col items-center justify-center">
        <h1 className=" font-semibold text-3xl text-center md:text-4xl lg:text-4xl">Navigate Your Career Journey with <Link href="/blogs" className=" text-[#FF70C1] cursor-pointer">
        Jobify's Blog
        </Link></h1>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mt-6'>
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <button className=' bg-white p-3 border-2 border-gray-600 rounded-2xl duration-700 ease-in-out shadow-2xl font-bold hover:shadow-orange-800'>Show More...</button>
    </section>
  )
}

export default Journey