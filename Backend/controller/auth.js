const express=require("express")
const {User}=require("../model/user.js")
const bcrypt = require('bcryptjs');
const createError =require("../utils/error.js")
const jwt=require("jsonwebtoken")

const Register=async(req,res,next)=>{
try{
    const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);

   const newuser= new User({
    username:req.body.username,
    email:req.body.email,
    password:hash,
    gender:req.body.gender,

   })
   await newuser.save()
   res.status(200).send("user has been created")
} catch(err) {
next(err)
}
}



const Login=async(req,res,next)=>{
    try{
   const user= await User.findOne({username:req.body.username})
   if(!user) return next(createError(404,"user not founds"))

    const isPasswordcorrect=await bcrypt.compare(req.body.password,user.password)
   if(!isPasswordcorrect) return next(createError(400,"wrong password or username"))

    const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{expiresIn:"1m"})

    const {password,isAdmin,...otherDetails}=user._doc
    
    res.cookie("access_token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production', // running in production environment 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }).status(200).json({...otherDetails}) ///Sends a JSON response with the contents of otherDetails.
    } catch(err) {
    next(err)
    }
    }



module.exports={Register,Login}