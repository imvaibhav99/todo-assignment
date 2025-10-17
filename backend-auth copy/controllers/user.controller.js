import {User} from '../models/user.model.js';
import {generateToken} from '../utils/generateToken.js';
import { catchAsync } from "../middlewares/error.middleware.js";
import { AppError } from "../middlewares/error.middleware.js";
import crypto from "crypto";

//create a new user
export const createUserAccount= catchAsync(async(req,res)=>{
    //fetch the details from the request body
    const {firstname,lastname,username,email,password}= req.body;

    //check if the user already exists
    const existingUser= await User.findOne({ email: email.toLowerCase() });
    if(existingUser){
        throw new AppError("User already exists with this email",400);
    }
    //create a new user
    const user = await User.create({
        firstname,
        lastname,
        username,
        email: email.toLowerCase(),
        password
    })

    //call the generateToken function from utils to generate the token and send the token and respons(user data) back to the user
    generateToken(res,user,"User created successfully");

})

//login user function
export const authenticateUser= catchAsync(async(req,res)=>{
    //extracted the email nd password from req
    const {email, password}= req.body;

    const user =await User.findOne({email:email.toLowerCase()}).select(
        "+password"   //to include the password field in the result set
    );
    //if user not found or password does not match
    if(!user|| !(await user.comparePassword(password))){
        throw new AppError("User not found in the database",401)
    }
    
    generateToken(res,user,"Login Successfull")
})

//logout user function

export const logoutUser= catchAsync(async(req,res)=>{

    res.cookie("token","",{
        httpOnly:true,
        expires: new Date(0)  //set the cookie to expire immediately
    }).json({
        success:true,
        message:"Logged out successfully"
    })
})

//fetching the user profile 
export const getCurrentUserProfile= catchAsync(async(req,res)=>{

    const user= await User.findById(req.user.id); //req.user is set in the auth.middleware.js file
    if(!user){
        throw new AppError("User not found in the database",404);
    }
    res.status(200).json({
        success:true,
        user
    })
});

export const updateUserProfile= catchAsync(async(req,res)=>{

    const {firstname,lastname,username,bio}= req.body;
    const userId=req.user.id;

    const user = await User.findById(userId);
    if(!user){
        throw new AppError("User not found in the database",404);
    }

     if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (username) user.username = username;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({
        success: true,
        user,
        message: "Profile updated successfully"
    })
})
