import React , { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Flight from './Flight.jsx';
import Home from './Home.jsx';
import Search from './Search.jsx';
import Hotel from './Hotel.jsx'
function Navbar() {

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/hotel">Hotel</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/search">Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/flights" element={<Flight />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};
export default Navbar;

