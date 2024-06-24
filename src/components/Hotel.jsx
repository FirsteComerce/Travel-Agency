import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import "./Hotel.css"; // Import the CSS file

function Hotel({ setQuery }) {
  const [edit, setEdit] = useState(null);
  const [capacite, setCapacite] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [etoile, setEtoile] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [hotels, setHotels] = useState([]);
  const [originalHotel, setOriginalHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/hotels/select');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleEdit = (id) => {
    setEdit(id);
    const hotel = hotels.find((e) => e._id === id);
    if (hotel) {
      setOriginalHotel(hotel);
      setCapacite(hotel.capacite);
      setType(hotel.type);
      setPrice(hotel.price);
      setName(hotel.name);
      setEtoile(hotel.etoile);
      setDescription(hotel.description);
      setImage(hotel.image);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/hotels/hotel/delete/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The hotel has been deleted.',
        showConfirmButton: false,
        timer: 1500
      });
      fetchHotels();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleDeleteConfirmation = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleUpdate = async (id) => {
    const query = {
      price: price,
      type: type,
      capacite: capacite,
      name: name,
      etoile: etoile,
      description: description,
      image: image
    };

    // Check if values are the same as original
    if (
      type === originalHotel.type &&
      capacite === originalHotel.capacite &&
      price === originalHotel.price &&
      name === originalHotel.name &&
      etoile === originalHotel.etoile &&
      description === originalHotel.description &&
      image === originalHotel.image
    ) {
      Swal.fire({
        icon: 'info',
        title: 'No changes detected',
        text: 'You have not made any changes to update.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/hotels/hotel/update/${id}`, query);
      fetchHotels();
    } catch (error) {
      console.error(error);
    }
    setEdit(null);
  };

  const handleRes = (hotl) => {
    setQuery({
      name: '',
      phone: '',
      mail: '',
      id: hotl._id,
      id_type: "Hotel reservation",
      type: hotl.type,
      capacite: hotl.capacite,
      go: null,
      ret: null,
      resName: hotl.name,
      price: hotl.price,
      etoile: hotl.etoile,
      description: hotl.description,
    });
    navigate("/reservation")
  }

  return (
    <React.Fragment>
      <div id="hotel-grid">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <div className="hotel-details">
              {edit === hotel._id ? (
                <>
                  <input id="edit-type" type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
                  <input id="edit-capacite" type="text" placeholder="Capacity" value={capacite} onChange={(e) => setCapacite(e.target.value)} />
                  <input id="edit-price" type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <input id="edit-name" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <input id="edit-etoile" type="text" placeholder="Star" value={etoile} onChange={(e) => setEtoile(e.target.value)} />
                  <input id="edit-description" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <input id="edit-image" type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
                </>
              ) : (
                <>
                  <p id="view-type">Type: {hotel.type}</p>
                  <p id="view-capacite">Capacity: {hotel.capacite}</p>
                  <p id="view-price">Price: {hotel.price}</p>
                  <p id="view-name">Name: {hotel.name}</p>
                  <p id="view-etoile">Star: {hotel.etoile}</p>
                  <p id="view-description">Description:<br/> {hotel.description}</p>
                  <p id="view-image">Image: {hotel.image}</p>
                </>
              )}
            </div>
            <div className="hotel-actions">
              {edit === hotel._id ? (
                <button id="confirm-button" onClick={() => handleUpdate(hotel._id)}>Confirm</button>
              ) : (
                <button id="update-button" onClick={() => handleEdit(hotel._id)}>Update</button>
              )}
              {edit === hotel._id ? (
                <button id="cancel-button" onClick={() => setEdit(null)}>Cancel</button>
              ) : (
                <button id="delete-button" onClick={() => handleDeleteConfirmation(hotel._id)}>Delete</button>
              )}
              {edit !== hotel._id && (
                <button id="reserve-button" onClick={() => handleRes(hotel)}>Reservation</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button id="add-hotel-button" onClick={() => navigate("/hotels/add")}>Add a hotel</button>
    </React.Fragment>
  );
}

export default Hotel;
