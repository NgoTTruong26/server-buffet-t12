"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Posts", "id", {
      type: Sequelize.UUID,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Users", "id", {
      autoIncrement: true,
      type: Sequelize.INTEGER,
    });
  },
};
