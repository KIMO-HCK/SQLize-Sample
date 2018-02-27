"use strict";
const schema = dataTypes => ({
  userId: { type: dataTypes.STRING(30), allowNull: false },
  incidentId: { type: dataTypes.STRING(30), allowNull: false }
});

module.exports = (sequelize, DataTypes) => {
  var user_incidents = sequelize.define("userIncidents", schema(DataTypes));
  return user_incidents;
};
