import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hotel from './Hotel.jsx'; 
import Addhotel from './Addhotel.jsx';
import Search from './Search.jsx'; 

const Main = () => {
  const [hotels, setHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/hotels/select')
      .then((res) => {
        setHotels(res.data);
        setSearchResults(res.data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Addhotel />
      <Search setSearchResults={setSearchResults} /> 
      <Hotel hotels={searchResults} /> 
    </>
  );
};

export default Main;
 