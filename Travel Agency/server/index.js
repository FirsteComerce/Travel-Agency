const express = require("express");
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

const { db } = require('./database/index.js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client"));
app.use('/api/hotels', routes);


app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
});
