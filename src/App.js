import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Search from "./components/Search.jsx";
import Add from "./components/Add.jsx";
import Flight from "./components/Flight.jsx";
import Home from "./components/Home.jsx";
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
        <Navbar setSearchResults={setSearchResults}/>
        <Routes>
          <Route path="/" element={<Home />} />
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
