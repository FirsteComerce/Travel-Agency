const mongoose = require('mongoose');
const db = require ("./index.js")
const hotelsSchema = new mongoose.Schema({
  price: Number,
  type: String,
  Capacite: Number,
  Name : String,
  Etoile : Number,
  Description : String, 
  Image : String
  
});

const Hotels = mongoose.model("Hotels", hotelsSchema);
module.exports = Hotels;
