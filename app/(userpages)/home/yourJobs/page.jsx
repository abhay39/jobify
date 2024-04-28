"use client"
import ViewJob from "@/components/ViewJob";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

const YourJobs = () => {

  const userInfo = useSelector(item => item.userInformation);
  const router = useRouter()
  const cookies = Cookies.get("token");
  const [totalPosted, setTotalPosted] = useState([]);
  const [viewJob, setViewJob] = useState(false);
  const [currentJobs, setCurrentJob] = useState(null);

  useEffect(() => {
    const signal = new AbortController().signal;
    const fetchData = async () => {
      let results = await fetch(`${process.env.API}/jobs/allJobs/getCurrentCompanyJobs/${cookies}`, signal);
      results = await results.json();
      setTotalPosted(results);
    }
    fetchData();
  }, [totalPosted])


  const hadleViewJob = () => {
    setViewJob(!viewJob);
    scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }




  return (
    <div className=" flex p-6 items-center justify-center flex-col ">
      <h1 className=" text-2xl lg:text-3xl font-extrabold">YOUR POSTED JOBS</h1>

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">


        {
          totalPosted.length > 0 ? (
            totalPosted.map((item) => {
              return (
                <div className=" w-full  flex flex-col gap-3 items-center justify-center mt-4 bg-slate-50 shadow-2xl p-3 rounded-lg">
                  <div className=" flex items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Title:</label>
                      <input value={item.title} readOnly name="title" type="text" placeholder=" Enter job Title" className="outline-none w-full border-b-2" />
                    </div>

                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Category:</label>
                      <select value={item.category} name="category" className="outline-none w-full border-b-2 cursor-pointer mt-3 lg:mt-0">
                        <option value=''>Select Category</option>
                        <option value='Graphics & Design'>Graphics & Design</option>
                        <option value='Mobile App Development'>Mobile App Development</option>
                        <option value='Frontend Web Development'>Frontend Web Development</option>
                        <option value='MERN Stack Development'>MERN Stack Development</option>
                        <option value='Account & Finance'>Account & Finance</option>
                        <option value='Video Animation'>Video Animation</option>
                        <option value='MEAN Stack Development'>MEAN Stack Development</option>
                        <option value='MEVN Stack Development'>MEVN Stack Development</option>
                        <option value='Data Entry Operator'>Data Entry Operator</option>
                        <option value='Teaching'>Teaching</option>
                      </select>
                    </div>
                  </div>


                  <div className=" flex  items-center  flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">City:</label>
                      <input value={item.city} readOnly name="title" type="text" placeholder=" Enter job Title" className="outline-none w-full border-b-2" />
                    </div>
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Country:</label>
                      <input value={item.country} readOnly name="title" type="text" placeholder=" Enter job Title" className="outline-none w-full border-b-2" />
                    </div>
                  </div>
                  <div className=" flex  items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Full Address:</label>
                      <input value={item.location} readOnly name="title" type="text" placeholder=" Enter job Title" className="outline-none w-full border-b-2" />
                    </div>
                  </div>
                  <div className=" flex  items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Deadline:</label>
                      <input value={item.deadline} name="deadline" type="date" placeholder=" Enter Deadline" className="outline-none w-full border-b-2" />
                    </div>

                  </div>
                  <div className=" flex  items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Salary:</label>
                      <input value={item.salary} name="salary" type="number" placeholder=" Enter Salary" className="outline-none w-full border-b-2" />
                    </div>

                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Job Type:</label>
                      <select value={item.jobType} name="jobType" className="outline-none w-full border-b-2 cursor-pointer mt-3 lg:mt-0">
                        <option value=''>Select Job Type</option>
                        <option value='Full-Time'>Full-Time</option>
                        <option value='Part-Time'>Part-Time</option>
                        <option value='Remote'>Remote</option>
                        <option value='Internship'>Internship</option>
                        <option value='Contracutal'>Contracutal</option>
                        <option value='Freelance'>Freelance</option>
                      </select>
                    </div>


                  </div>
                  <div className=" flex  items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Description:</label>
                      <textarea value={item.description} name="description" rows={5} type="text" placeholder=" Enter Full Location" className="outline-none w-full border-b-2" />
                    </div>
                  </div>
                  <div className=" flex items-center flex-col lg:flex-row w-full gap-3">
                    <div className=" justify-start flex flex-col items-start w-full">
                      <label htmlFor="">Total Applications: {item.users.length}</label>
                      <button onClick={() => {
                        hadleViewJob()
                        setCurrentJob(item)
                      }} className=" bg-green-700 mt-3 text-white w-full rounded-lg p-2">View Applications </button>
                    </div>
                    <div className=" justify-start flex flex-col items-start w-full">

                      <button className=" bg-red-700  text-white w-full rounded-lg lg:mt-8 p-2">Delete Job </button>
                    </div>
                  </div>
                </div>
              )
            })
          ) :
            (
              <h1 className=" text-xl mt-4 text-center lg:text-3xl font-extrabold ">No Jobs Posted Yet</h1>
            )
        }

      </div>
      {
        viewJob && (
          <div className=" z-50 absolute  min-h-screen top-0 left-0 w-full">
            <ViewJob currentJobs={currentJobs} hadleViewJob={hadleViewJob} />
          </div>
        )
      }

    </div>
  )
}

export default YourJobs