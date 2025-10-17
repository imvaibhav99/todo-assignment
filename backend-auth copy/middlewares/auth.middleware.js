//verification of login password with the hashed password at each route
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import { catchAsync } from './error.middleware.js';
import { AppError } from './error.middleware.js';


export const isAuthenticated= catchAsync(async(req ,res ,next)=>{
        const token= req.cookies.token; //catch the token from the browser cookies

        //handle the error if no token is found
        if(!token){
            throw new AppError("Not authorized to access this route",401);
        }

        try{
           //decode the cookies token with the secret key and verify if true or not
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //addd user id of after the decoding to the req object
            req.id = decoded.userId;
            //fetch the user from the db with the id 
            const user= await User.findById(req.id);
         
             if (!user) {
      throw new AppError("User not found", 404);
    }
       //put the user details in the req object to be used in every routes
            req.user=user;

            next();

        }
        catch(error){
            //error handler for invalid token or expired token
              if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token. Please log in again.", 401);
    }
    if (error.name === "TokenExpiredError") {
      throw new AppError("Your token has expired. Please log in again.", 401);
    }
    throw error;

        }
})

