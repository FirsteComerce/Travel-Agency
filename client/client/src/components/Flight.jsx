import React, { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add.jsx";
const Flight = () => {
  const [flights, setFlights] = useState([]);
  const [editing, setEditing] = useState(null);
  const [createForm, setCreateForm] = useState({
    capacite: "",
    price: "",
    type: "",
    destination: "",
    go: "",
    ret: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, []);
const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/flight/");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };
const handleEdit = (id) => {
    setEditing(id);
    const flight = flights.find((flight) => flight.id === id);
    if (flight) {
      setCreateForm({
        capacite: flight.capacite || "",
        type: flight.type_flight || "",
        price: flight.price || "",
        destination: flight.destination || "",
        go: flight.go_date || "",
        ret: flight.return_date || "",
        image: flight.image || "",
      });
    }
  };
const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/flight/delete/${id}`);
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };
const uploadImage = async () => {
    if (!file) return createForm.image;
 const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hotel_preset");
 try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw1sxdmac/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
const handleUpdate = async (id) => {
    let imageUrl = await uploadImage();
    if (file && !imageUrl && !createForm.image) {
      alert("Error uploading image");
      return;
    }
    const updatedData = {
      type_flight: createForm.type,
      capacite: createForm.capacite,
      go_date: createForm.go,
      return_date: createForm.ret,
      destination: createForm.destination,
      price: createForm.price,
      image: imageUrl || createForm.image || "",
    };
try {
      await axios.put(
        `http://localhost:3000/api/flight/update/${id}`,
        updatedData
      );
      setEditing(null);
      fetchFlights();
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };
const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
return (
    <div>
      <Add />
      {flights.map((flight) => (
        <div key={flight.id}>
          {editing === flight.id ? (
            <>
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={createForm.type}
                onChange={handleChange}
              />
              <input
                type="number"
                name="capacite"
                placeholder="Capacity"
                value={createForm.capacite}
                onChange={handleChange}
              />
              <input
                type="date"
                name="go"
                placeholder="Go Date"
                value={createForm.go}
                onChange={handleChange}
              />
              <input
                type="date"
                name="ret"
                placeholder="Return Date"
                value={createForm.ret}
                onChange={handleChange}
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={createForm.destination}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={createForm.price}
                onChange={handleChange}
              />
              <input type="file" onChange={handleFileChange} />
              {createForm.image && (
                <img
                  src={createForm.image}
                  alt="Flight"
                  style={{ maxWidth: "200px", maxHeight: "200px" }}
                />
              )}
            </>
          ) : (
            <>
              <ul>
                <li>Type: {flight.type_flight}</li>
                <li>Capacity: {flight.capacite}</li>
                <li>Go Date: {flight.go_date}</li>
                <li>Return Date: {flight.return_date}</li>
                <li>Destination: {flight.destination}</li>
                <li>Price: {flight.price}</li>
                {flight.image && (
                  <li>
                    <img
                      src={flight.image}
                      alt="Flight"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  </li>
                )}
              </ul>
            </>
          )}
          {editing === flight.id ? (
            <>
              <button onClick={() => handleUpdate(flight.id)}>Confirm</button>
              <button onClick={() => setEditing(null)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(flight.id)}>Update</button>
              <button onClick={() => handleDelete(flight.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Flight;
