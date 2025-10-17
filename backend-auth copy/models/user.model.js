import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema= new mongoose.Schema({
    firstname:{
        
        type: String,
        required: [true,"First name is required"],
        trim: true,
        minLength:3,
        maxLength:[50,"First name must be less than 50 characters"]

    },
    lastname:{
      
        type:String,
        required: [true,"Last name is required"],
        trim:true,
        minLength:3,
        maxLength:[50,"Last name must be less than 50 characters"]

    },
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength:3,
        maxLength:[20,"Username must be less than 20 characters"]
    },
     email:{
        type:String,
        required: [true,"Email is required"],
        trim: true,
        unique: true,
        lowercase:true,
         match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },
    password:{
        type:String,
        required: [true,"Password is required"],
        minLength:[6,"Password must be at least 6 characters"],
        select:false  //to not return the password when querying the user,but returns when creating or updating the user
    },
    bio:{
        type: String,
        maxLength: [200,"Bio must be less than 200 characters"],
        default: ""
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
   
},{timestamps:true});

//hash the password before saving the user into the database
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password= await bcrypt.hash(this.password,12);
    next();

})

//compare password token for authenticating during the login
// compares the passowrd with the one saved in the database for login
userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//reset password token for forgot password
userSchema.methods.getResetPasswordToken= function(){
    const resetToken= crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire= Date.now() + 15*60*1000;
    return resetToken;
}

export const User= mongoose.model("User",userSchema)

