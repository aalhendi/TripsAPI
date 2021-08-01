/* Models */
const { User, Profile } = require("../../db/models");
/* Imports */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");

exports.register = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);

    /* Create Profile */
    /* Check if user has a profile (sanity) */
    const foundProfile = await Profile.findOne({
      where: { userId: newUser.id },
    });
    /* Prevent user from having two profiles */
    if (foundProfile) {
      const error = new Error("User already has a Profile.");
      error.status = 400;
      return next(error);
    }
    /* Create empty profile */
    await Profile.create({
      userId: newUser.id,
      bio: "",
      image: "",
    });
    /* End Create Profile */

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
