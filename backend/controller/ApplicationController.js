import { Application } from "../model/applicationSchema.js";
import { Job } from "../model/jobSchema.js";

export const createApplication=async(req,res)=>{
    const data=req.body;
    console.log(data)
    try{
        const newJob=new Application(data)
        const findJob=await Job.findById(data.jobID);
        if(findJob){
            findJob.users.push(data.applicantID);
            await findJob.save();
        }
        const isDone=await newJob.save();
        if(isDone){
            res.status(201).json("Job Applied successfully!!");
        }else{
            res.status(500).json("Something went wrong!!");
        }
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const getAllApplications=async(req, res, next) => {
    try{
        const application=await Application.find({
            applicantID:req.params.id
        }).populate("jobID")
        res.status(200).json(application);
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const deleteApplication=async(req,res)=>{
    try{
        const {jobid,applicantID,userId} = req.params;
        const finaAppliation=await Application.findByIdAndDelete(applicantID);
        const findJob=await Job.findById(jobid);
        if(findJob){
            const a=findJob.users.filter((userId)=>item.userId!=userId);
            let ab=await findJob.save();
            if(finaAppliation && ab){
                res.status(201).json("Job Deleted successfully!!");
            }
        }else{
            res.status(500).json("Something went wrong!!");
        }
    }catch(err){
        res.status(500).json(err.message);
    }
}
