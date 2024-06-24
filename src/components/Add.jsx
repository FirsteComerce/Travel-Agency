import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Add.css";

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
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

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

    const handleAdd = async () => {
        if (!id || !capacite || !price || !type || !destination || !go || !ret) {
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

        const query = {
            id: id,
            type_flight: type,
            capacite: capacite,
            go_date: go,
            return_date: ret,
            destination: destination,
            price: price,
            image: imageUrl
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
            <input type="file" onChange={handleFileChange} />
            <button id="add-button" onClick={handleAdd}>Add</button>
            <button id="cancel-button" onClick={() => { navigate('/flights') }}>Cancel</button>
        </div>
    );
}

export default Add;
