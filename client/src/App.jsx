import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Registration from './Registrationn'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Home.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'



function App() {
 

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Registration/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>


     </Routes>
    </BrowserRouter>
  )
}

export default App
