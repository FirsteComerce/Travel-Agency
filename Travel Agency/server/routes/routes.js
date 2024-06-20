const express = require('express');
const router = express.Router();
const Hotels = require('../database/model.js')
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/select', async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).send(hotels);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const hotel = await Hotels.findOne({ name: name }); 
    if (!hotel) {
      return res.status(404).send({ message: 'Hotel not found' });
    }
    res.status(200).send(hotel.name);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const newHotels = req.body;
    const insertedHotels = await Hotels.insertMany(newHotels);
    res.status(201).json(insertedHotels);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
)

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { price, type, capacite, name, etoile, description, image } = req.body;
  try {
    const document = await Hotels.findById(id);
    if (!document) {
      return res.status(404).send({ message: 'Hotel not found' });
    }
    if (price !== undefined) document.price = price;
    if (type !== undefined) document.type = type;
    if (capacite !== undefined) document.capacite = capacite;
    if (name !== undefined) document.name = name;
    if (etoile !== undefined) document.etoile = etoile;
    if (description !== undefined) document.description = description;
    if (image !== undefined) document.image = image;
    await document.save();
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Hotels.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).send({ message: 'Hotel not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
