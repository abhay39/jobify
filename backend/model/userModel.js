import mongoose from 'mongoose';
import validator from 'validator';

const UserModel=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"],
        unique:true,
        minLength:[3, "Name must contain atleast 3 characters"],
        maxLength:[30, "Name cannot contain more then 30 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minLength:[6, "Password must contain atleast 6 characters"],
    },
    profilePicture:{
        type:String,
        required:[true,"Please enter a profile picture url"]
    },
    role:{
        type:String,
        required:[true,"Please select a role"],
        enum:["Company","Job Seeker","Admin"],
        default:"jobSeeker",
    },
    phoneNumber:{
        type:String,
        required:[true,"Please enter a phone number"],
        minLength:[10, "Phone Number must contain atleast 10 characters"],
        maxLength:[10, "Phone Number cannot contain more then 10 characters"],
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:String
    }
},
    {
        timestamps:true
    }
)

const User=mongoose.model("User",UserModel);

export default User