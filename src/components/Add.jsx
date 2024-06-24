import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Add.css"; // Import the CSS file

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

function Add() {
    const [id, setId] = useState('');
    const [capacite, setCapacite] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [destination, setDestination] = useState('');
    const [go, setGo] = useState('');
    const [ret, setRet] = useState('');
    const navigate = useNavigate();

    const handleAdd = async () => {
        if (!id || !capacite || !price || !type || !destination || !go || !ret) {
            Swal.fire({
                icon: 'warning',
                title: 'All fields are required',
                text: 'Please fill in all fields before submitting',
            });
            return;
        }

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
            Toast.fire({
                icon: 'success',
                title: 'Added successfully'
            });
            navigate('/flights')
        } catch (e) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to add'
            });
            console.error(e);
        }
        
    };

    return (
        <div className="add-container">
            <input type="text" placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <input type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
            <input type="date" placeholder="Go Date" value={go} onChange={(e) => setGo(e.target.value)} />
            <input type="date" placeholder="Return Date" value={ret} onChange={(e) => setRet(e.target.value)} />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button id="add-button" onClick={handleAdd}>Add</button>
            <button id="cancel-button" onClick={() => { navigate('/flights') }}>Cancel</button>
        </div>
    );
}

export default Add;
