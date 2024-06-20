const express = require("express");
<<<<<<< HEAD
const mongoose =require('mongoose');
const routes = require('./routes/routes.js')
const {db} =require('./database/index.js')
const cors =require ('cors')  

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/hotels',routes);
const PORT = process.env.PORT || 3003
app.listen(PORT, function () {
  console.log("listening on port 3003!");
});
=======
const hotelsRoutes = require('./routes/hotel.routes.js');  
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client"));
app.use("/api/hotels", hotelsRoutes);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});

>>>>>>> aaee33dc4c03f03dea7b3f1a07b0f3f5c1b120ce
