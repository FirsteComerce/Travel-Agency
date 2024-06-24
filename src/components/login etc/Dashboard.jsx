import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./App.css"


const Dashboard = () => {
    const [message,setmessage]=useState("")
    const navigate=useNavigate()
    


   useEffect(()=>{
    axios.get("http://localhost:5000/user/checkauth",{withCredentials:true})
    .then(res=>
        {
        if(res.data.Login){
            setmessage(res.data.message)
            console.log(message);
            
        } else {
            navigate("/");
        }

        }
    )
    .catch(err=>{console.log(err)
     navigate("/")
   })
    
   },[])

    return (
        <div >

     <h2 className="msg">{message}</h2>
     
        </div>
    )
}

export default Dashboard