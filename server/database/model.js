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

const res = new mongoose.Schema({
    id:Number,
    name:String,
    mail:String,
    phone:Number,
    id_type:String,
    type:String,
    go_date:Date,
    return_date:Date,
    resName:String,
    price:Number,
    capacite:Number,
    etoile : Number,
    description : String, 
})

const hotelsSchema = new mongoose.Schema({
    price: Number,
    type: String,
    capacite: Number,
    hotlName : String,
    etoile : Number,
    description : String, 
    image : Array
  });

module.exports = {Flight :mongoose.model('Schema', Schema),
                  Resevation :mongoose.model('reservation',res),
                  Hotels :mongoose.model("Hotels", hotelsSchema)
                };