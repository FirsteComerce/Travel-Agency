const express = require("express");
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
