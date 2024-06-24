const express=require("express")
const router=express.Router();
const { verifyToken, verifyUser } = require("../utils/verifyToken.js");

router.get("/checkauth",verifyToken,(req,res,next)=>{
    res.json({Login:true,message:"hello user you are logged in !"})
})

router.get("/checkuser/:_id",verifyUser,(req,res,next)=>{
    res.send("hello user you are logged in and you can delete your account!")
})







module.exports=router