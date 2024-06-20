import React, { useState } from 'react';
import axios from 'axios';

function Add() {
    //For flights 
    const [id, setId] = useState('');
    const [capacite, setCapacite] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    const [go, setGo] = useState('');
    const [ret, setRet] = useState('');

    const handleAdd = async () => {
        const query = {
            id: id,
            type_flight: type,
            capacite: capacite,
            go_date: go,
            return_date: ret,
            destination: destination,
            price: price,
        };
        try {
           await axios.post('http://localhost:3000/api/flight/post', query);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <input type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
            <input type="text" placeholder="Go Date" value={go} onChange={(e) => setGo(e.target.value)} />
            <input type="text" placeholder="Return Date" value={ret} onChange={(e) => setRet(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
    
}



export default Add;
