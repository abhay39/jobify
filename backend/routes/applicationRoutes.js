import express from 'express';
import { checkIfApplied } from '../middleware/applicationMiddleware.js';
import { createApplication, deleteApplication, getAllApplications } from '../controller/ApplicationController.js';


const router=express.Router();

router.post("/submitApplication",checkIfApplied,createApplication)
router.get("/getAllApplications/:id",getAllApplications)
router.get("/deleteUserApplication/:jobid/:applicantID/:userId",deleteApplication)


export default router;