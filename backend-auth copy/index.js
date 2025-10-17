import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import taskRoute from "./routes/task.route.js";



dotenv.config();
//conecting to the database
connectDB();



const app=express();
const PORT=9000;

//global rate limiter
const limiter= rateLimit({
    windowMs:15*60*1000, // 15 minutes
    max:100, // limit each IP to 100 requests per windowMs
    message:'Too many requests from this IP, please try again after 15 minutes'
})

//security middlewares
app.use(helmet());
app.use(hpp())
app.use("/api",limiter);//to apply the rate limiter to all the routes starting with /api

if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
}

//body parser middlewares
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);

//Routes
app.use("/api/v1/user",userRoute); //creating the version 1 for the user route
app.use("/api/v1/tasks", taskRoute);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res)=>{
  res.status(404).json({
    success:false,
    message:"Route not found"
  })
});

//error in routes can be handlede and thrown
app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})