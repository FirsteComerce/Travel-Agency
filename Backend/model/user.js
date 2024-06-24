const mongoose=require("mongoose")


const userschhema=new mongoose.Schema({
    username:{
     type:String,
     required:true,
     unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
       },
       password:{
        type:String,
        required:true
       },
       gender:{
        type:String,
        required:true
       },
},{timestamps:true}) //createdAt updatedAt


const User=mongoose.model("User",userschhema)


module.exports={User}