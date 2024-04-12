import express from 'express';
import { getUserDetails, login, register, verifyAccount } from '../controller/AuthController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/verifyAccount",verifyAccount)
router.get("/getUserDetails/:token",verifyToken,getUserDetails)

export default router;