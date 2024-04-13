import { Job } from "../model/jobSchema.js";
import User from "../model/userModel.js";
import jwt from 'jsonwebtoken'

const sec=process.env.JWT_SECRET || "abhay";

export const verifyCompany=async(req,res,next)=>{
    const {company}=req.body;
    try{
        const checkIfExists= await User.findById(company);
        
        if(!checkIfExists){
            return res.status(400).send("Company does not exist");
        }
        if(checkIfExists.role==='Company'){
            next();
        }
        else{
            return res.status(400).send("You are not a company");
        }
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const verifyCurrentCompany=async(req,res,next)=>{
    const token = req.params.token;
   
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, sec);
        // console.log(decoded,token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.companyId = decoded.id;

        const checkIfExists= await User.findById(req.companyId);
        
        if(!checkIfExists){
            return res.status(400).send("Company does not exist");
        }
        if(checkIfExists.role==='Company'){
            next();
        }
        else{
            return res.status(400).send("You are not a company");
        }
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}