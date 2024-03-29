module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    image: { type: DataTypes.STRING },
    bio: {
      type: DataTypes.TEXT,
    },
    username: {
      type: DataTypes.STRING,
    },
  });

  return Profile;
};
