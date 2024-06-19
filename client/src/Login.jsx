import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    

    const navigate=useNavigate()

    const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/auth/login",{username,password})
        .then((res)=>{
            console.log(res.data)
        //   navigate('/login')
        })
            
        .catch((err)=>console.log(err))
    }

    return (
        <div className="justify-content">
            <div className="bg-white">
                <h2>Register</h2>
                <form onSubmit={handlesubmit}>
                    <div className="mb">
                        <label htmlFor="username">
                            <strong>Username</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="username"
                            className="form-control"
                            onChange={(e) => setusername(e.target.value)}
                        />
                    </div>
                    
                    <div className="mb">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="btn"> Login</button>

                </form>
                <p>Don't  have an accout </p>
                <button className="btn">Register</button>

            </div>


        </div>
    )
}

export default Login