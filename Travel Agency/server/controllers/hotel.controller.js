const Hotels = require('../database-mongodb/hotel.model.js');

const selectAllHotels = function (req, res) {
  Hotels.find({})
    .then(hotels => {
      console.log(hotels);
      res.json(hotels); 
    })
    .catch(error => {
      console.error("Error fetching hotels:", error.message);
      res.status(500).json({ error: "An error occurred while fetching hotels data" });
    });
};

const addHotels = function (req, res) {
  const { price, type, Capacite, Name, Etoile, Description, Image } = req.body;
  Hotels.create({ price, type, Capacite, Name, Etoile, Description, Image })
    .then(hotel => {
      console.log("Hotel added:", hotel);
      res.json(hotel);
    })
    .catch(error => {
      console.error("Error adding hotel:", error.message);
      res.status(500).json({ error: "An error occurred while adding a hotel" });
    });
};

const updateHotels = function (req, res) {
  const { id } = req.params;
  const { price, type, Capacite, Name, Etoile, Description, Image } = req.body;
  Hotels.findByIdAndUpdate(id, { price, type, Capacite, Name, Etoile, Description, Image }, { new: true })
    .then(hotel => {
      console.log("Hotel updated:", hotel);
      res.json(hotel);
    })
    .catch(error => {
      console.error("Error updating hotel:", error.message);
      res.status(500).json({ error: "An error occurred while updating the hotel" });
    });
};

const deleteHotels = function (req, res) {
  const { id } = req.params;
  Hotels.findByIdAndDelete(id)
    .then(() => {
      console.log("Hotel deleted successfully");
      res.json({ message: "Hotel deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting hotel:", error.message);
      res.status(500).json({ error: "An error occurred while deleting the hotel" });
    });
};

const searchHotels = function (req, res) {
  const { Name } = req.params;
  Hotels.find({ Name: Name })
    .then(hotels => {
      if (hotels.length === 0) {
        console.log("No hotels found with the given name:", Name);
        return res.status(404).json({ message: "No hotels found with the given name" });
      }
      console.log("Hotels found:", hotels);
      res.json(hotels);
    })
    .catch(error => {
      console.error("Error searching hotels:", error.message);
      res.status(500).json({ error: "An error occurred while searching hotels" });
    });
};

module.exports = { selectAllHotels, addHotels, updateHotels, deleteHotels, searchHotels };
