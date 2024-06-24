import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Addhotel.css"; // Import the CSS file

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

function Addhotel() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [capacite, setCapacite] = useState('');
    const [name, setName] = useState('');
    const [etoile, setEtoile] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleAddhotel = async () => {
        if (!id || !price || !type || !capacite || !name || !etoile || !description || !image) {
            Swal.fire({
                icon: 'warning',
                title: 'All fields are required',
                text: 'Please fill in all fields before submitting',
            });
            return;
        }

        const hotelData = {
            id: parseInt(id),
            price: parseInt(price),
            type,
            capacite: parseInt(capacite),
            name,
            etoile: parseInt(etoile),
            description,
            image
        };

        try {
            await axios.post('http://localhost:3000/api/hotels/create', hotelData);
            Toast.fire({
                icon: 'success',
                title: 'Added successfully'
            });
            setId('');
            setPrice('');
            setType('');
            setCapacite('');
            setName('');
            setEtoile('');
            setDescription('');
            setImage('');
        } catch (e) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to add'
            });
            console.error(e);
        }
        navigate('/hotel');
    };

    return (
        <div className="add-container">
            <div className="input-container">
                <input type="text" placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Stars" value={etoile} onChange={(e) => setEtoile(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="input-container">
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button id="addhotel-button" onClick={handleAddhotel}>Add</button>
            <button id="cancelhotel-button" onClick={() => { navigate('/hotel') }}>Cancel</button>
        </div>
    );
}

export default Addhotel;
