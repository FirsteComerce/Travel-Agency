import React , { useState } from 'react'
import axios from 'axios';
function Search({ setSearchResults }) {

  return (
    <nav>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Look for a destination"
        />
        <button onClick={()=>{handleSearch()}}>Search</button>
    </nav>
  );
};

export default Search
