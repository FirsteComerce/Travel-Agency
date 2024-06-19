import React, { useState } from 'react';
import axios from 'axios';

function Flight({ flights }) {
    const [editing, setEditing] = useState(null);
    const [capacite, setCapacite] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    const [go, setGo] = useState('');
    const [ret, setRet] = useState('');

    const handleEdit = (id) => {
        setEditing(id);
        const flight = flights.find((e) => e.id === id);
        if (flight) {
            setCapacite(flight.capacite);
            setType(flight.type_flight);
            setPrice(flight.price);
            setDestination(flight.destination);
            setGo(flight.go_date);
            setRet(flight.return_date);
        }
    };

    const handelDel=(id)=>{
        try {
        axios.delete(`http://localhost:3000/api/flight/delete/${id}`)
      }
      catch(e) {
        console.log(e);
      }
      }

    const updt = async (id, query) => {
        try {
            await axios.put(`http://localhost:3000/api/flight/update/${id}`, query);
        } catch (e) {
            console.error(e);
        }
        setEditing(null);
    };

    const handleUpdate = (id) => {
        const query = {
            type_flight: type,
            capacite :capacite,
            go_date: go,
            return_date: ret,
            destination :destination,
            price:price,
        };
        updt(id, query);
    };

    return (
        <React.Fragment>
            {flights.map((flight) => (
                <div key={flight.id}>
                    <ul>
                        {editing === flight.id ? (
                            <>
                                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                                <input type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
                                <input type="text" placeholder="Go Date" value={go} onChange={(e) => setGo(e.target.value)} />
                                <input type="text" placeholder="Return Date" value={ret} onChange={(e) => setRet(e.target.value)} />
                                <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
                                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </>
                        ) : (
                            <>
                                <li>Type: {flight.type_flight}</li>
                                <li>Capacity: {flight.capacite}</li>
                                <li>Go Date: {flight.go_date}</li>
                                <li>Return Date: {flight.return_date}</li>
                                <li>Destination: {flight.destination}</li>
                                <li>Price: {flight.price}</li>
                            </>
                        )}
                    </ul>
                    {editing === flight.id ? (
                        <button onClick={() => handleUpdate(flight.id)}>Confirm</button>
                    ) : (
                        <button onClick={() => handleEdit(flight.id)}>Update</button>
                    )}
                    {editing === flight.id ? (
                        <button onClick={() => setEditing(null)}>Cancel</button>
                    ) : (
                        <button onClick={() => handelDel(flight.id)}>Delete</button>
                    )}
                </div>
            ))}
        </React.Fragment>
    );
}

export default Flight;
