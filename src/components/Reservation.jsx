import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";

const formatDate = (dateString) => {
  return new Date(dateString).toISOString().split('T')[0];
};

function Reservation({ reservation, query }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [goDate, setGoDate] = useState(formatDate(query.go));
  const [returnDate, setReturnDate] = useState(formatDate(query.ret));

  const navigate = useNavigate();

  const handleAdd = async () => {
    query.name = name;
    query.mail = mail;
    query.phone = phone;
    try {
      await axios.post("http://localhost:3000/api/flight/reservation/post", query);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="reservation-container">
      <div>
        <input id="reservation-name" type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input id="reservation-mail" type="text" placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)} />
      </div>
      <div>
        <input id="reservation-phone" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <input id="reservation-type" type="text" placeholder="Type" value={query.type} readOnly />
      <input id="reservation-id-type" type="text" placeholder="ID Type" value={query.id_type} readOnly />
      <input id="reservation-capacity" type="text" placeholder="Capacity" value={query.capacite} readOnly />

      {query.id_type === 'Flight' ? (
        <>
          <input id="reservation-go-date" type="text" placeholder="Go Date" value={formatDate(query.go)} readOnly />
          <input id="reservation-return-date" type="text" placeholder="Return Date" value={formatDate(query.ret)} readOnly />
          <input id="reservation-destination" type="text" placeholder="Destination" value={query.resName} readOnly />
        </>
      ) : (
        <>
          <div>
            <input id="reservation-go-date" type="date" placeholder="Go Date" value={goDate} onChange={(e) => setGoDate(e.target.value)} />
          </div>
          <div>
            <input id="reservation-return-date" type="date" placeholder="Return Date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
          </div>
        </>
      )}

      <input id="reservation-price" type="text" placeholder="Price" value={query.price} readOnly />
      <div id="reservation-disclaimer">
        * Some fields needs to be filled manually.
      </div>
      <button id="reservation-add-button" onClick={handleAdd}>Add</button>
      {query.id_type === 'Flight' ? (
        <button id="reservation-cancel-button" onClick={() => navigate('/flights')}>Cancel</button>
      ) : (
        <button id="reservation-cancel-button" onClick={() => navigate("/hotel")}>Cancel</button>
      )}
      
    </div>
  );
}

export default Reservation;
