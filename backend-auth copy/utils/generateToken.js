import jwt from 'jsonwebtoken';

export const generateToken= (res,user,message)=>{

    //user id is embedded in the token along with the secret key and expiry time of 1d
  const token = jwt.sign( {userId: user._id}, process.env.JWT_SECRET,{
    expiresIn: '1d'
  })
    return res.status(200).
    cookie('token', token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24*60*60*1000,  //1d
    })  
    .json({
        success: true,
        message:"User created successfully",
        user    //token and the user data is sent back to the user
    })
}