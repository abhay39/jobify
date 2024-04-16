import { Application } from "../model/applicationSchema.js";
import { Job } from "../model/jobSchema.js";

export const createJob=async(req,res)=>{
    const data=req.body;
    try{
        const newJob=new Job(data)
        const isDone=await newJob.save();
        if(isDone){
            res.status(201).json("Job Created successfully!!");
        }else{
            res.status(500).json("Something went wrong!!");
        }
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const allJobs=async(req,res)=>{
    try{
        const getAllJobs=await Job.find().populate('company');
        res.status(200).json(getAllJobs);
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const getJobsById=async(req,res)=>{
    try{
        const getAllJobs=await Job.findById(req.params.id).populate('company');
        res.status(200).json(getAllJobs);
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const getCurrentCompanyJobs=async(req,res)=>{
    try{
        const getAllJobs=await Job.find({
            company:req.companyId
        });
        res.status(200).json(getAllJobs);
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const getApplicationsOfCurrentJob=async(req,res)=>{
    try{
        const getAllJobs=await Application.find({
            jobID:req.params.jobID
        });
        res.status(200).json(getAllJobs);
    }catch(err){
        res.status(500).json(err.message);
    }
}
