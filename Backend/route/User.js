const express=require("express")
const router=express.Router();
const usercontroller=require("../controller/user.js");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken.js");

router.get("/checkauth/",verifyToken,(req,res,next)=>{
    res.send("hello user you are logged in !")
})

router.get("/checkuser/:_id",verifyUser,(req,res,next)=>{
    res.send("hello user you are logged in and you can delete your account!")
})

router.get("/checkadmin/:_id",verifyAdmin,(req,res,next)=>{
    res.send("hello admin you are logged in and you can delete all accounts!")
})


router.put("/:_id",verifyUser,usercontroller.updatedUser)
router.delete("/:_id",verifyUser,usercontroller.deletedUser)
router.get("/:_id",verifyUser,usercontroller.getUser)
router.get("/",verifyAdmin,usercontroller.getUsers)



module.exports=router