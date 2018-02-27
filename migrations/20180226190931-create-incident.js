"use strict";
let cuid = require("cuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Incidents", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(25),
        defaultValue: () => cuid()
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Incidents");
  }
};
