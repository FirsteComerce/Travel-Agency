import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Flight.css";

function Flight({ flights, setQuery }) {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(null);
  const [capacite, setCapacite] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [destination, setDestination] = useState("");
  const [go, setGo] = useState("");
  const [ret, setRet] = useState("");
  const [originalFlight, setOriginalFlight] = useState(null);

  const handleEdit = (id) => {
    setEditing(id);
    const flight = flights.find((e) => e.id === id);
    if (flight) {
      setOriginalFlight(flight);
      setCapacite(flight.capacite);
      setType(flight.type_flight);
      setPrice(flight.price);
      setDestination(flight.destination);
      setGo(flight.go_date);
      setRet(flight.return_date);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/flight/delete/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The flight has been deleted.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (e) {
      console.log(e);
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
      icon: 'question',
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
      capacite: capacite,
      go_date: go,
      return_date: ret,
      destination: destination,
      price: price,
    };
    if (
      type === originalFlight.type_flight &&
      capacite === originalFlight.capacite &&
      go === originalFlight.go_date &&
      ret === originalFlight.return_date &&
      destination === originalFlight.destination &&
      price === originalFlight.price
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

    updt(id, query);
  };

  const handleRes = (flight) => {
    setQuery({
      name: '',
      phone: '',
      mail: '',
      id: flight.id,
      id_type: "Flight",
      type: flight.type_flight,
      capacite: flight.capacite,
      go: flight.go_date,
      ret: flight.return_date,
      resName: flight.destination,
      price: flight.price,
      etoile: null,
      description: null,
    });
    navigate("/reservation")
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <>
      <div id="flight-grid">
        {flights.map((flight) => (
          <div key={flight.id} className="flight-card">
            <div className="flight-details">
              {editing === flight.id ? (
                <>
                  <input
                    id="edit-type"
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  />
                  <input
                    id="edit-capacite"
                    type="text"
                    placeholder="Capacity"
                    value={capacite}
                    onChange={(e) => setCapacite(e.target.value)}
                  />
                  <input
                    id="edit-go"
                    type="text"
                    placeholder="Go Date"
                    value={formatDate(go)}
                    onChange={(e) => setGo(e.target.value)}
                  />
                  <input
                    id="edit-return"
                    type="text"
                    placeholder="Return Date"
                    value={formatDate(ret)}
                    onChange={(e) => setRet(e.target.value)}
                  />
                  <input
                    id="edit-destination"
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <input
                    id="edit-price"
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p id="view-type">Type: {flight.type_flight}</p>
                  <p id="view-capacite">Capacity: {flight.capacite}</p>
                  <p id="view-go">Go Date: {formatDate(flight.go_date)}</p>
                  <p id="view-return">Return Date: {formatDate(flight.return_date)}</p>
                  <p id="view-destination">Destination: {flight.destination}</p>
                  <p id="view-price">Price: {flight.price}</p>
                  <li>
                    <img
                      src={flight.image}
                      alt="Flight"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </li>
                </>
              )}
            </div>
            <div className="flight-actions">
              {editing === flight.id ? (
                <button id="confirm-button" onClick={() => handleUpdate(flight.id)}>Confirm</button>
              ) : (
                <button id="update-button" onClick={() => handleEdit(flight.id)}>Update</button>
              )}
              {editing === flight.id ? (
                <button id="cancel-button" onClick={() => setEditing(null)}>Cancel</button>
              ) : (
                <button id="delete-button" onClick={() => handleDeleteConfirmation(flight.id)}>Delete</button>
              )}
              {editing !== flight.id && (
                <button id="reserve-button" onClick={() => handleRes(flight)}>Reservation</button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button id="add-flight-button" onClick={() => navigate("/flight/add")}>Add a flight</button>
    </>
  );
}

export default Flight;
