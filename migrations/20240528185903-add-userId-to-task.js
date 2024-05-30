"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tasks", "userId", {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users", // name of the related model
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("tasks", "userId");
  },
};
