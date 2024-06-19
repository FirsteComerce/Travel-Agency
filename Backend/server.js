const express=require("express")
const dotenv=require("dotenv")
const app=express()
const mongoose=require("mongoose")
const authRoute=require("./route/Auth.js")
const userRoute=require("./route/User.js")
const cookieparser=require("cookie-parser")
const cors=require("cors")


/// it reads the .env file, parses the contents
dotenv.config()





///middlewares

app.use(cors(
    {
        credentials:true //cookies will be included in the requests.

    }
))

/// general errors in express app
app.use((err,req,res,next)=>{
    const errstatus=err.status|| 500
    const errmessage=err.message || "something went wrong"
    return res.status(errstatus).json({
     success:false,
     status:errstatus,
     message:errmessage

    })
})



app.use(cookieparser()) ///parses htttp req cookies make them availabe to javascript object 

app.use(express.json())

app.use("/auth/",authRoute)
app.use("/user/",userRoute)



//connection to database
const conn=async()=>{
    try{
await mongoose.connect("mongodb://127.0.0.1:27017/TravelAgency")
console.log("connected to mongodb!");
    } catch (err){
    throw err
    }
};



app.listen(5000,()=>{
    conn()
    console.log("connected to backend!");
})