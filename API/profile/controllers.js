/* Models */
const { Profile } = require("../../db/models");
// TODO: Use normalize-path

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.fetchAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    /* The user updating the profile must be the owner*/
    if (req.user.id !== req.profile.userId) {
      const error = new Error("Unauthorized.");
      error.status = 401;
      return next(error);
    }
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    await req.profile.update(req.body);
    res.json(req.profile);
  } catch (error) {
    next(error);
  }
};

exports.findProfile = async (req, res, next) => {
  try {
    res.json(req.profile);
  } catch (error) {
    next(error);
  }
};
