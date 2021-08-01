/* Imports */
const express = require("express");
const { fetchProfile, updateProfile } = require("./controllers");
const passport = require("passport");
const router = express.Router();

/* Param middleware */
router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const error = new Error("Profile Not Found.");
    error.status = 404;
    next(error);
  }
});

/* Update Profile */
router.put(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

module.exports = router;
