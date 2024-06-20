const mongoose = require('mongoose');
const db = require ("./index.js")
const hotelsSchema = new mongoose.Schema({
  price: Number,
  type: String,
  capacite: Number,
  name : String,
  etoile : Number,
  description : String, 
  image : Array
  
});

module.exports = mongoose.model("Hotels", hotelsSchema); 