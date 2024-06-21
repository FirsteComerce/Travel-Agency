import React, { useState } from "react";
import axios from "axios";

function Add() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
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
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading image", error);
      return null;
    }
  };

  const handleAdd = async () => {
    let imageUrl = "";
    try {
      if (image) {
        imageUrl = await uploadImage();
        if (!imageUrl) {
          alert("Error uploading image");
          return;
        }
        setImageUrl(imageUrl);
      }

      const query = {
        name,
        location,
        description,
        rating,
        price,
        image: imageUrl,
      };

      await axios.post("http://localhost:3003/api/hotels/post", query);
      alert("Hotel added successfully!");
      setName("");
      setLocation("");
      setDescription("");
      setRating("");
      setPrice("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error adding hotel:", error);
      alert("Failed to add hotel");
    }
  };

  return (
    <div>
      <h2>Add a Hotel</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleAdd}>Add Hotel</button>
    </div>
  );
}

export default Add;
