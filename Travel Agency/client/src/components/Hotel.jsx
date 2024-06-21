import React, { useState } from "react";
import axios from "axios";

function Hotel({ hotels }) {
  const [edit, setEdit] = useState(null);
  const [capacite, setCapacite] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [etoile, setEtoile] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [imageUrl, setImageUrl] = useState(""); 

  const handleEdit = (id) => {
    setEdit(id);
    const hotel = hotels.find((e) => e._id === id);
    if (hotel) {
      setCapacite(hotel.capacite);
      setType(hotel.type);
      setPrice(hotel.price);
      setName(hotel.name);
      setEtoile(hotel.etoile);
      setDescription(hotel.description);
      setImageUrl(hotel.image);
    }
  };

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3003/api/hotels/delete/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!image) return imageUrl; 

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

  const handleUpdate = async (id) => {
    try {
      const imageUrl = await uploadImage();
      if (imageUrl !== null) {
        setImageUrl(imageUrl); 
      }

      const query = {
        price: price,
        type: type,
        capacite: capacite,
        name: name,
        etoile: etoile,
        description: description,
      
      };

      await axios.put(`http://localhost:3003/api/hotels/update/${id}`, query);
      setEdit(null);
    } catch (error) {
      console.error("Error updating hotel", error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  return (
    <React.Fragment>
      {hotels.map((hotel) => (
        <div key={hotel._id}>
          <ul>
            {edit === hotel._id ? (
              <>
                <input
                  type="text"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Capacity"
                  value={capacite}
                  onChange={(e) => setCapacite(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Star"
                  value={etoile}
                  onChange={(e) => setEtoile(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={hotel.name}
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
              </>
            ) : (
              <>
                <li>Type: {hotel.type}</li>
                <li>Capacity: {hotel.capacite}</li>
                <li>Price: {hotel.price}</li>
                <li>Name: {hotel.name}</li>
                <li>Star: {hotel.etoile}</li>
                <li>Description: {hotel.description}</li>
                <li>Image: {hotel.image}</li>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              </>
            )}
          </ul>
          {edit === hotel._id ? (
            <>
              <button onClick={() => handleUpdate(hotel._id)}>Confirm</button>
              <button onClick={() => setEdit(null)}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => handleEdit(hotel._id)}>Update</button>
              <button onClick={() => handleDelete(hotel._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </React.Fragment>
  );
}

export default Hotel;
