import React, { useState } from 'react';
import axios from 'axios';

function Addhotel() {
    const [id, setId] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [capacite, setCapacite] = useState('');
    const [name, setName] = useState('');
    const [etoile, setEtoile] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleAddhotel = async () => {
        const hotelData = {
            id : parseInt(id),
            price: parseInt(price),
            type,
            capacite: parseInt(capacite),
            name,
            etoile: parseInt(etoile),
            description,
            image
        };

        try {
            await axios.post('http://localhost:3003/api/hotels/create', hotelData);
            alert('Hotel added successfully !');
            setId('');
            setPrice('');
            setType('');
            setCapacite('');
            setName('');
            setEtoile('');
            setDescription('');
            setImage('');
        } catch (error) {
            console.error('Error adding hotel:', error);
            alert('Failed to add hotel');
        }
    };

    return (
        <div>
            <input type="text" placeholder="Id" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
            <input type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Stars" value={etoile} onChange={(e) => setEtoile(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddhotel}>Add</button>
        </div>
    );
}

export default Addhotel;
