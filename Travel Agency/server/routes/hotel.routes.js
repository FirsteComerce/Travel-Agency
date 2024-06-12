const router = require('express').Router();
const hotelsController = require("../controllers/hotel.controller.js"); 

router.get("/select", hotelsController.selectAllHotels);
router.post("/create", hotelsController.addHotels);
router.put("/update/:id", hotelsController.updateHotels);
router.delete("/delete/:id", hotelsController.deleteHotels);
router.get("/select/:Name", hotelsController.searchHotels);


module.exports = router;
