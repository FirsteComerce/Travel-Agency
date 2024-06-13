const express = require("express");
const mongoose =require('mongoose');
const routes = require('./routes/routes.js')
const {db} =require('./database/index.js')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/flight',routes);
const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
  console.log("listening on port 3000!");
});
