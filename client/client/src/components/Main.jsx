import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Flight from './Flight.jsx';
import Navbar from './Navbar.jsx';
import Search from './Search.jsx';
import Add from './Add.jsx';

const Main = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/flight/')
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Add/>
    </>
  );
};

export default Main;
