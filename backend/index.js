import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobsRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import connect from './utils/dbConnect.js';
import cors from 'cors';


const app= express();
dotenv.config();
app.use(express.json())
app.use(cors());
const PORT=process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.json("Welcome to backend of Jobify!!! ")
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/jobs",jobsRoutes)
app.use("/api/v1/application",applicationRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port",PORT)
})

connect();

export default app;