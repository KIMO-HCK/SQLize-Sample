"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("userIncidents", {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.STRING(30),
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId"
        }
      },
      incidentId: {
        type: Sequelize.STRING(30),
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "Incidents",
          key: "id",
          as: "incidentId"
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("userIncidents");
  }
};
