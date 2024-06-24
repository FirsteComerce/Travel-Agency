import React from 'react'

function SearchRes({searchResults}) {
    
  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };



  return (  
    <>
        {searchResults.map((e) => (
        <div key={e.id}>
        <li>Type: {e.type_flight}</li>
        <li>Capacity: {e.capacite}</li>
        <li>Go Date: {formatDate(e.go_date)}</li>
        <li>Return Date: {formatDate(e.return_date)}</li>
        <li>Destination: {e.destination}</li>
        <li>Price: {e.price}</li>
        </div>
        ))}
    </>
  )
}

export default SearchRes
