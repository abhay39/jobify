import express from 'express';
import { allJobs, createJob, getApplicationsOfCurrentJob, getCurrentCompanyJobs, getJobsById } from '../controller/JobsController.js';
import { verifyCompany, verifyCurrentCompany } from '../middleware/jobsMiddleware.js';

const router=express.Router();

router.post("/createJob",verifyCompany,createJob)
router.get("/allJobs",allJobs)
router.get("/allJobs/:id",getJobsById)
router.get("/allJobs/getCurrentCompanyJobs/:token",verifyCurrentCompany,getCurrentCompanyJobs)

router.get("/allJobs/getCurrentCompanyJobs/getApplicationsOfCurrentJob/:jobID",getApplicationsOfCurrentJob)

export default router;