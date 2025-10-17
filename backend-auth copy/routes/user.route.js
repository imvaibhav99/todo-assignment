import express from "express";
import {createUserAccount,authenticateUser,logoutUser,getCurrentUserProfile,updateUserProfile} from '../controllers/user.controller.js';
import { validateSignup, validateSignin } from "../middlewares/validation.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

//post request to create a new user
router.post("/signup", validateSignup, createUserAccount);
router.post("/login",validateSignin,authenticateUser);
router.post("/logout",logoutUser);
router.get("/current-user",isAuthenticated,getCurrentUserProfile)
router.patch("/update-user",isAuthenticated,updateUserProfile);



export default router;



