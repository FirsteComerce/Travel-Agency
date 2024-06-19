const mongoose = require("mongoose");
const db = require("./index.js");

const Schema = new mongoose.Schema({
    id : Number,
    type_flight:String,
    capacite:Number,
    go_date:Date,
    return_date:Date,
    destination:String,
    price:Number,
    image:Array,

});

module.exports = mongoose.model('Schema', Schema);