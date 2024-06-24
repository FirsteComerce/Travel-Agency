const createError =require("../utils/error.js")
const jwt=require("jsonwebtoken")



const verifyToken=(req,res,next)=>{
    console.log("Cookies: ", req.cookies);
    const token =req.cookies.access_token;
    if(!token){
        if(newtoken(req,res)) {
           return  
        }
        return next(createError(401,"you are not authenticated"))
    } else {

    jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,decoded)=>{
        if(err) return next(createError(403,"token is not valid"));
        req.user=decoded.user; //decoded user
        
        next()
    })
}
}



const newtoken=(req,res,next)=>{
    console.log("Cookies: ", req.cookies);
    const refresh =req.cookies.refresh_token;
    
    if(!refresh){
        return next(createError(401,"no refresh token "))
    } else {

    jwt.verify(refresh,process.env.JWT_REFRESH_SECRET,(err)=>{
        if(err) return next(createError(403,"refresh token is not valid"));


        //Use decoded data to create a new access token
        const accessToken=jwt.sign({id:decoded.id,username:decoded.username},process.env.JWT_ACCESS_SECRET,{expiresIn:"1m"})
        res.cookie("access_token",accessToken,{
            maxAge:60000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict"})
            req.user = decoded;
        next()
    })

}

}



const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id ){
            next()
        } else {
             return next(createError(403,"you are not authorized"));
        }
    })
}



module.exports={verifyToken, verifyUser}