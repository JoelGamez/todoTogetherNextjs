"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tasks", "points", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn("tasks", "priority", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("tasks", "completed", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tasks", "points");
    await queryInterface.removeColumn("tasks", "priority");
    await queryInterface.removeColumn("tasks", "completed");
  },
};
