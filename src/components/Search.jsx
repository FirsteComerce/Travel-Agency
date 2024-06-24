import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.css"; // Import the CSS file

function Search({ setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const look = async (dest) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/flight/get/${dest}`);
      setSearchResults(res.data);
      navigate("/search/destination");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (x) => {
    look(x);
  };

  return (
    <nav className="search-nav">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Look for a destination"
      />
      <button
        onClick={() => {
          handleSearch(searchTerm);
        }}
      >
        Search
      </button>
    </nav>
  );
}

export default Search;
