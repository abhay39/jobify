"use client"
import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css'

const SidebarFilters = () => {
    const [salaryRange,setSalaryRange]=useState({
        min: 0,
        max: 0,
    })

  return (
    <aside className='  sticky w-full top-0 left-0 bg-white h-[650px] rounded-md px-6 py-4 '>
        <div className=' flex justify-between items-center'>
            <h1 className=' font-bold text-[#012E13] text-2xl'>Filter</h1>
            <p className=' text-green-500 cursor-pointer'>Reset</p>
        </div>
        <hr />

        <div className=' mt-3'>
            <h1 className='  text-[#012E13] font-semibold text-xl'>Sort By</h1>
            <div className='grid grid-cols-2 gap-2'>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent1" className='rounded-md p-1'/>
                    <label htmlFor="recent1">Recently</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent2" className='rounded-md p-1'/>
                    <label htmlFor="recent2">A-Z</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent3" className='rounded-md p-1'/>
                    <label htmlFor="recent3">Top Salary</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent4" className='rounded-md p-1'/>
                    <label htmlFor="recent4">Rating</label>
                </div>
            </div>

            <h1 className='  text-[#012E13] font-semibold text-xl mb-3 mt-3'>Salary Range</h1>
            <RangeSlider  min={0} max={1000000} onInput={(value)=>{
                setSalaryRange({
                    min: value[0],
                    max: value[1],
                })
            }}/>
            <div className=' flex mt-2 items-center justify-around'>
                <p>&#8377;. <span className=' font-bold'>{salaryRange.min}</span></p>
                <hr className=' border-[1px] border-slate-600 w-[20%]'/>
                <p>&#8377;.<span className=' font-bold'>{salaryRange.max}</span></p>
            </div>

            <h1 className='  text-[#012E13] font-semibold text-xl mt-3'>Job Type</h1>
            <div className='grid grid-cols-2 gap-2'>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent1" className='rounded-md p-1'/>
                    <label htmlFor="recent1">Full-Time</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent2" className='rounded-md p-1'/>
                    <label htmlFor="recent2">Part-Time</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent3" className='rounded-md p-1'/>
                    <label htmlFor="recent3">Contractual</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent4" className='rounded-md p-1'/>
                    <label htmlFor="recent4">Freelance</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent4" className='rounded-md p-1'/>
                    <label htmlFor="recent4">Internship</label>
                </div>
            </div>


            <h1 className='  text-[#012E13] font-semibold text-xl mt-3'>Work Location</h1>
            <div className='grid grid-cols-2 gap-2'>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent1" className='rounded-md p-1'/>
                    <label htmlFor="recent1">On-Site</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent2" className='rounded-md p-1'/>
                    <label htmlFor="recent2">Remote</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent3" className='rounded-md p-1'/>
                    <label htmlFor="recent3">Hybrid</label>
                </div>
                
            </div>


            <h1 className='  text-[#012E13] font-semibold text-xl mt-3'>Experience Level</h1>
            <div className='grid grid-cols-2 gap-2'>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent1" className='rounded-md p-1'/>
                    <label htmlFor="recent1">Fresher</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent2" className='rounded-md p-1'/>
                    <label htmlFor="recent2">Beginner</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent3" className='rounded-md p-1'/>
                    <label htmlFor="recent3">Intermediate</label>
                </div>
                <div className='gap-3 mt-1 flex items-center'>
                    <input type="radio" name="recent" id="recent4" className='rounded-md p-1'/>
                    <label htmlFor="recent4">Expert</label>
                </div>
                
            </div>

        </div>

    </aside>
  )
}

export default SidebarFilters