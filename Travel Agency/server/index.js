const express = require("express");
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

