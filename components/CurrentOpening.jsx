import JobCard from "./JobCard"

const CurrentOpening = () => {
  return (
    <section className=" min-h-screen flex items-center justify-center  flex-col">
        <h1 className=" font-semibold text-2xl md:text-3xl lg:text-4xl"> <span className=" text-[#FF70C1]">Explore</span> Our Current Job Openings</h1>
        
        <div className=" grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-4 gap-3 mt-4">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
        </div>

    </section>
  )
}

export default CurrentOpening