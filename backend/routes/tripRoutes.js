const express = require("express");
const router = express.Router();

const {
  getTrips,
  createTrip,
  deleteTrip
} = require("../controllers/tripController");

router.get("/", getTrips);
router.post("/", createTrip);
router.delete("/:id", deleteTrip);

module.exports = router;