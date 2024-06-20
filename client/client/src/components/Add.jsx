import React, { useState } from "react";
import axios from "axios";

function Add() {
  const [id, setId] = useState("");
  const [capacite, setCapacite] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [destination, setDestination] = useState("");
  const [go, setGo] = useState("");
  const [ret, setRet] = useState("");
  const [file, setFile] = useState(null);

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

  const handleAdd = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        alert("Error uploading image");
        return;
      }
    }

    const query = {
      id,
      type_flight: type,
      capacite,
      go_date: go,
      return_date: ret,
      destination,
      price,
      image: imageUrl,
    };

    console.log("Payload to be sent:", query);

    try {
      await axios.post("http://localhost:3000/api/flight/post", query);
      alert("Flight added successfully!");
    } catch (e) {
      console.error("Error adding flight:", e.response?.data || e.message);
      alert(`Failed to add flight: ${e.response?.data?.message || e.message}`);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Capacity"
        value={capacite}
        onChange={(e) => setCapacite(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Go Date"
        value={go}
        onChange={(e) => setGo(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Return Date"
        value={ret}
        onChange={(e) => setRet(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add</button>
    </form>
  );
}

export default Add;
