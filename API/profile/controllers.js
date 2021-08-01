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

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    await req.profile.update(req.body);
    res.json(req.profile);
  } catch (error) {
    next(error);
  }
};
