import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search.jsx";
import Add from "./components/Add.jsx";
import Flight from "./components/Flight.jsx";
import Home from "./components/login etc/Home.jsx";
import Login from './components/login etc/Login.jsx'
import Dashboard from './components/login etc/Dashboard.jsx'
import Registration from './components/login etc/Registrationn'
import Nav from './/components/login etc/Navbar.jsx'
import Hotel from "./components/Hotel.jsx";
import Reservation from "./components/Reservation.jsx";
import SearchRes from "./components/SearchRes.jsx";
import Addhotel from "./components/Addhotel.jsx";

const App = () => {
  const [flights, setFlights] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [searchResults,setSearchResults]=useState([])
  const [query, setQuery] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/flight/")
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flights]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/flight/reservation")
      .then((res) => {
        setReservation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reservation]);
  return (
    <>
      <Router>
        <Nav />
        {/* setSearchResults={setSearchResults} */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path='/register' element={<Registration/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path="/hotel" element={<Hotel setQuery={setQuery}/>} />
          <Route path="/hotels/add" element={<Addhotel/>}/>
          <Route path="/reservation" element={<Reservation reservation={reservation} query={query}/>} />
          <Route path="/flights" element={<Flight flights={flights} setQuery={setQuery}/>} />
          <Route path="/flight/add" element={<Add />} />
          <Route path="/search/destination" element={<SearchRes searchResults={searchResults}/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
