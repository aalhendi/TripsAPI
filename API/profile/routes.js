/* Imports */
const express = require("express");
const {
  fetchProfile,
  updateProfile,
  findProfile,
  fetchAllProfiles,
} = require("./controllers");
const passport = require("passport");
const { upload } = require("../../middleware/multer");
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
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

/* Fetch Profile */
router.get("/:profileId", findProfile);

/* Fetch all profiles */
router.get("/", fetchAllProfiles);

module.exports = router;
