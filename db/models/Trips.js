module.exports = (sequelize, DataTypes) => {
  const Trips = sequelize.define("Trips", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title is required",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Trips;
};
