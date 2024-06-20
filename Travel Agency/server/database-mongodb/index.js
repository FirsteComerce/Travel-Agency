
const express = require('express'); 
const mongoose = require('mongoose');



const app = express();

mongoose.connect('mongodb://localhost:27017/hotels', {

})
.then(() => {
    console.log("Connected to MongoDB"); 
})
.catch((err) => {
    console.log("Connection failed",err);
    
});
const db = mongoose.connection; 
module.exports = db;