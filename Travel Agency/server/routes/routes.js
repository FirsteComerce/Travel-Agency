const router = require('express').Router();
const {fetching} = require('../methods.js');
const Schema =require('../database/model.js')
const bodyParser = require('body-parser');

router.get('/', async (req, res) => {
  try {
    const flight = await Schema.find();
    res.status(200).json(flight);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/get/:id', async (req, res) => {
  try {
  const {id} = req.params;
  const retrive = await Schema.findOne({id:id})
  if (retrive) {
    res.status(200).json(retrive)
  } 
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
  }
)

router.post('/post', async (req, res) => {
    try {
    const bdd = req.body;
    const existing = await Schema.findOne({ id: bdd.id });
    if (existing) {
      return res.status(400).json({ error: 'User with this ID already exists' });
    }
      const inserted = await Schema.insertMany([bdd]);
      res.status(201).json(inserted);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    const {type_flight,capacite,go_date,return_date,destination,price,image} = req.body;
    try {
      const retrive = await Schema.findOne({id:id})
      if (type_flight) retrive.type_flight = type_flight;
      if (capacite) retrive.capacite = capacite;
      if (go_date) retrive.go_date = go_date;
      if (return_date) retrive.return_date = return_date;
      if (price) retrive.price = price;
      if (image) retrive.image = image;
      await retrive.save();
      res.status(200).json(retrive);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    }
  );
  router.delete('/delete/:id',async (req, res) => {
    const {id} = req.params;
    try {
      await Schema.deleteOne({id:id})
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
   });

module.exports= router