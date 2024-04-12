import User from "../model/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import otpGenerator  from 'otp-generator'
import nodemailer from 'nodemailer';
import { verifyToken } from "../middleware/authMiddleware.js";

const sec=process.env.JWT_SECRET || "abhay";
const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: 'abhayguptaak39@gmail.com',
        pass: 'cnxnswlxhsgpsdtb'
    },
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
});

export const register=async(req,res)=>{
    try{
        const {name,email,password,phoneNumber,role,profilePicture}=req.body;
        const checkIfUser=await User.findOne({
            email:email
        })
        console.log(name,email,password,phoneNumber,role,profilePicture)
        if(checkIfUser){
            return res.status(400).send("User already exists");
        }
        const hashPassword= await bcrypt.hash(password,10);
        const otp=otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
        const newUser=new User({
            name:name,
            email:email,
            password:hashPassword,
            phoneNumber:phoneNumber,
            role:role,
            otp:otp,
            profilePicture:profilePicture
        })
        const savedUser=await newUser.save();
        if(savedUser){
            const mailOptions=({
                from: "abhayguptaak39@gmail.com",
                to: `${email}`,
                subject: 'Jobify Account Verification',
                html: `
                
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px;">
    
    <h2 style="color: #333; text-align: center;">Complete Your Jobify Account Verification</h2>
    <p style="text-align: left;">Dear <b>${name}</b>,</p>
    
    <p>Thank you for registering an account with Jobify. Your security is our top priority, and we appreciate your cooperation in completing the verification process.</p>
    
    <p><strong>One-Time Password (OTP):</strong> ${otp}</p>
    
    <p>As a valued user, your trust is paramount to us. The OTP verification process is a crucial step in ensuring the security of your Jobify account. By verifying your identity, we can guarantee that only you have access to your account, thus preventing unauthorized access and potential fraud.</p>
    
    <p>We kindly ask you to complete this verification promptly to unlock the full range of services and benefits available on Jobify. Should you encounter any difficulties or have any questions, our dedicated support team is here to assist you. Simply reach out to us via [contact information] or visit our Help Center at [link to help center].</p>
    
    <p>Your satisfaction is our priority, and we are committed to providing you with a smooth and secure experience on Jobify. Thank you for choosing us as your preferred payment platform.</p>
    
    <p style="text-align: center;">Best regards,</p>
    <p style="text-align: center;"><b>Abhay Kumar Gupta</b><br>Customer Support Representative<br><b>Jobify</b></p>
</div>`
            })
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    res.json(error)
                } else {
                    res.status(201).json("OTP has been successfully sent to your email account. Verify Your Profile to get started");
                }
            });
            
        }else{
            res.status(500).send("Something went wrong");
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password,role}=req.body;
        // console.log(email,password,role)
        const checkIfUser=await User.findOne({
            email:email
        })
        if(!checkIfUser){
            return res.status(400).json("User doesn't exist");
        }
        if(checkIfUser.role==role){
            const isMatch=await bcrypt.compare(password,checkIfUser.password);
            if(isMatch){
                const token= jwt.sign({id:checkIfUser._id},sec,{
                    expiresIn:"30d"
                })
                res.status(201).json(token);
            }else{
                res.status(400).json("Invalid password");
            }
        }
        else{
            res.status(400).json("Invalid role");
        }
        
    }catch(err){
        res.status(500).json(err.message);
    }
}

export const verifyAccount=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const checkIfUser=await User.findOne({
            email:email
        })
        if(!checkIfUser){
            return res.status(400).send("User doesn't exist");
        }
        if(checkIfUser.otp===otp){
            const token= jwt.sign({id:checkIfUser._id},sec,{
                expiresIn:"30d"
            })
            checkIfUser.isVerified=true;
            checkIfUser.otp=null;
            await checkIfUser.save();
            
            res.cookie('token', token, { httpOnly: true, secure: true });   
            return res.status(201).json({
                message: "Account verified successfully!!",
                token: token
            });
        }else{
            res.status(400).send("Invalid OTP");
        }
        
    }catch(err){
        res.status(500).send(err.message);
    }
}


export const getUserDetails = async(req, res,next) =>{

    try {
        const userDetails = await User.findById(req.userId).select("-password");
        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(401).json("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}