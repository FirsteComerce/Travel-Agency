import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Registration = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [gender, setgender] = useState("")

    const navigate=useNavigate()

    const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/auth/register",{username,email,password,gender})
        .then((res)=>{
          navigate('/login')
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
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            onChange={(e) => setemail(e.target.value)}
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
                    <div className="mb">
                        <label htmlFor="gender">
                            <strong>Gender</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Gender"
                            autoComplete="off"
                            name="gender"
                            className="form-control"
                            onChange={(e) => setgender(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn"> Register</button>

                </form>
                <p>Already have an accout </p>
                <button className="btn">Login</button>

            </div>


        </div>
    )
}

export default Registration