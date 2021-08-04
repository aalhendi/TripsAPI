module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    image: { type: DataTypes.STRING },
    bio: {
      type: DataTypes.TEXT,
    },
    // no need for username field here.
    // you already have a username in the User model.
    username: {
      type: DataTypes.STRING,
    },
  });

  return Profile;
};
