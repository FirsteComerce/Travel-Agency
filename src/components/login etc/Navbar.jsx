import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav className="nav">
      <div className="logo">Bookini</div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/hotel">Hotels</Link>
        </li>
        <li>
          <Link to="/flights">Flights</Link>
        </li>
        <li>
          <Link to="/register">Account User</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Nav;
