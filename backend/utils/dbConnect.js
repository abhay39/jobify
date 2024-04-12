import mongoose from 'mongoose';

const connect=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

export default connect