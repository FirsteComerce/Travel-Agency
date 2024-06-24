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
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [capacite, setCapacite] = useState('');
    const [name, setName] = useState('');
    const [etoile, setEtoile] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);


    //?cloudinary
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
    
      const uploadImage = async () => {
        if (!file) return null;
    
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "hotel_preset");
    
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dw1sxdmac/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Image uploaded successfully:", res.data);
          return res.data.secure_url;
        } catch (error) {
          console.error(
            "Error uploading image:",
            error.response?.data || error.message
          );
          return null;
        }
      };

    const handleAddhotel = async () => {
        if (!price || !type || !capacite || !name || !etoile || !description) {
            Swal.fire({
                icon: 'warning',
                title: 'All fields are required',
                text: 'Please fill in all fields before submitting',
            });
            return;
        }
        let imageUrl = "";
        if (file) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
            alert("Error uploading image");
            return;
        }
        }
        const hotelData = {
            price: parseInt(price),
            type,
            capacite: parseInt(capacite),
            name,
            etoile: parseInt(etoile),
            description,
            image :imageUrl,
        };

        try {
            await axios.post('http://localhost:3000/api/hotels/create', hotelData);
            Toast.fire({
                icon: 'success',
                title: 'Added successfully'
            });
            setPrice('');
            setType('');
            setCapacite('');
            setName('');
            setEtoile('');
            setDescription('');
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
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button id="addhotel-button" onClick={handleAddhotel}>Add</button>
            <button id="cancelhotel-button" onClick={() => { navigate('/hotel') }}>Cancel</button>
        </div>
    );
}

export default Addhotel;
