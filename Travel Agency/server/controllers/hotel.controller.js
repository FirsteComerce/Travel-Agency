const Hotels = require ('../database-mongodb/hotel.model.js')

const selectAllHotels = function (res) {
  Hotels.find({})
    .then(hotels => {
      console.log("done");
      res.send("done");
    })
    .catch(error => {
      console.log("error try again");
      res.send("error try again");
    });
};

const addHotels = function (req, res) {
  const { price, type, Capacite, Name, Etoile, Description, Image } = req.body;
  Hotels.create({ price, type, Capacite, Name, Etoile, Description, Image })
    .then(hotel => {
      console.log("done");
      res.send("done");
    })
    .catch(error => {
      console.log("error try again");
      res.send("error try again");
    });
};

const updateHotels = function (req, res) {
  const { id } = req.params;
  const { price, type, Capacite, Name, Etoile, Description, Image } = req.body;
  Hotels.findByIdAndUpdate(id, { price, type, Capacite, Name, Etoile, Description, Image }, { new: true })
    .then(hotel => {
      console.log("done");
      res.send("done");
    })
    .catch(error => {
      console.log("error try again");
      res.send("error try again");
    });
};

const deleteHotels = function (req, res) {
  const { id } = req.params;
  Hotels.findByIdAndDelete(id)
    .then(() => {
      console.log("done");
      res.send("done");
    })
    .catch(error => {
      console.log("error try again");
      res.send("error try again");
    });
};

const searchHotels = function (req, res) {
  const { Name } = req.params;
  Hotels.find({ Name: Name })
    .then(hotels => {
      if (hotels.length === 0) {
        console.log("error try again");
        return res.send("error try again");
      }
      console.log("done");
      res.send("done");
    })
    .catch(error => {
      console.log("error try again");
      res.send("error try again");
    });
};

module.exports = { selectAllHotels, addHotels, updateHotels, deleteHotels, searchHotels };
