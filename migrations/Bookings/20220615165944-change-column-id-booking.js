"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Bookings", "id", {
      type: Sequelize.UUID,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Bookings", "id", {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },
};
