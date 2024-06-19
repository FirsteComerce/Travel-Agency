const createError =require("../utils/error.js")
const jwt=require("jsonwebtoken")



const verifyToken=(req,res,next)=>{
    console.log("Cookies: ", req.cookies);
    const token =req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are not authenticated"))
    } else {

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"token is not valid"));
        req.user=user; //decoded user
        
        next()
    })
}
}



const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        } else {
            if(err) return next(createError(403,"you are not authorized"));
        }
    })
}


const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.User.isAdmin){
            next()
        } else {
            if(err) return next(createError(403,"you are not authorized"));
        }
    })
}
module.exports={verifyToken, verifyUser,verifyAdmin}