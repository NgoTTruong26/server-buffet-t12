"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "id", {
      type: Sequelize.UUID,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "id", {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },
};
