/* Imports */
const express = require("express");
const { upload } = require("../../middleware/multer");
const {
  fetchTrips,
  deleteTrip,
  fetchTrip,
  createTrip,
  updateTrip,
} = require("./controllers");
const passport = require("passport");

const router = express.Router();

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

// Get Trips
router.get("/", fetchTrips);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createTrip
);
router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deleteTrip
);
router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTrip
);

module.exports = router;
