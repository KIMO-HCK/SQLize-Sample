"use strict";

let cuid = require("cuid");

module.exports = (sequelize, DataTypes) => {
  var Incident = sequelize.define("Incident", {
    id: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      defaultValue: () => cuid()
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  Incident.associate = function(models) {
    Incident.belongsToMany(models.user, {
      through: "userIncidents",
      foreignKey: "incidentId",
      otherKey: "userId"
    });
  };
  return Incident;
};
