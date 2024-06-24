import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file
import Search from "./Search";

const Navbar = ({setSearchResults}) => {
  const navigate = useNavigate();

  const handleSwitch = (x) => {
    navigate(`/${x}`);
  };

  return (
    <nav>
      <li onClick={() => handleSwitch("")}>Home</li>
      <li onClick={() => handleSwitch("hotel")}>Hotel</li>
      <li onClick={() => handleSwitch("flights")}>Flights</li>
      <Search setSearchResults={setSearchResults}/>
    </nav>
  );
};

export default Navbar;
