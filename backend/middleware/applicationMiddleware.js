import { Application } from "../model/applicationSchema.js";


export const checkIfApplied = async (req, res, next) => {
    const { jobID, applicantID } = req.body;
    console.log(jobID, applicantID);
    try {
        const application = await Application.findOne({
            jobID: jobID,
            applicantID: applicantID
        });
        console.log("Middleware called", application);
        if (application) {
            console.log("If Called");
            return res.status(400).json("You have already applied for this job");
        } else {
            console.log("Next Called");
            next();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}

