"use strict";
let cuid = require("cuid");

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define("user", {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      defaultValue: () => cuid()
    },
    name: DataTypes.STRING(50)
  });
  user.associate = function(models) {
    user.belongsToMany(models.Incident, {
      through: "userIncidents",
      foreignKey: "userId",
      otherKey: "incidentId"
    });
  };
  return user;
};
