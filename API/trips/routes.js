/* Imports */
const express = require("express");
const multer = require("multer");
const { fetchTrips, deleteTrip, fetchTrip } = require("./controllers");

const router = express.Router();

/* Multer */
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

/* Param middleware */
router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const error = new Error("Trip Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Multer */
const upload = multer({ storage });

// Get Trips
router.get("/", fetchTrips);
// router.post("/trips", upload.single("image"),createTrip);
router.delete("/:tripId", deleteTrip);

module.exports = router;
