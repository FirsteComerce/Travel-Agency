const express=require("express")
const {User}=require("../model/user.js")


const updatedUser=async(req,res,next)=>{
    try{
        const updateduser=await User.findByIdAndUpdate(
            req.params._id,
            {$set:req.body},
            {new:true}
        );
        res.status(200).json(updateduser)
    } catch(err){
        next(err);
    }
}

const deletedUser=async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params._id);
        res.status(200).json("user has been deleted")
    } catch (err) {
        next(err)
    }
}

const getUser=async(req,res,next)=>{
    try{
        const oneuser=await User.findById(req.params._id);
        res.status(200).json(oneuser)
    } catch (err) {
        next(err)
    }
}

const getUsers=async(req,res,next)=>{
    try{
        const users=await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
}

module.exports={getUsers,getUser,deletedUser,updatedUser}