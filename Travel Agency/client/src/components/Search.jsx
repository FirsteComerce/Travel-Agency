import React, { useState } from 'react';
import axios from 'axios';

function Search({ setSearchResults }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/api/hotels/search/${searchTerm}`);
      setSearchResults(response.data, searchTerm)
    } catch (error) {
      console.error("There was an error searching for the hotel!", error);
    }
  };

  return (
    <nav>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Look for a hotel by name"
      />
      <button onClick={handleSearch}>Search</button>
    </nav>
  );
}

export default Search;
