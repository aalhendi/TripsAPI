/* Imports */
const express = require("express");
const multer = require("multer");
const { fetchTrips } = require("./controllers");

const router = express.Router();
/* Multer */
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get Trips
router.get("/trips", fetchTrips);
// router.post("/trips", upload.single("image"),createTrip);

module.exports = router;
