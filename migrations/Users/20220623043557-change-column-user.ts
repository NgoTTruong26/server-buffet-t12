"use strict";

import { DataTypes, QueryInterface } from "sequelize/types";

module.exports = {
  async up(queryInterface: QueryInterface, dataTypes: typeof DataTypes) {
    await queryInterface.changeColumn("users", "id", {
      type: dataTypes.UUID,
    });
  },

  async down(queryInterface, dataTypes: typeof DataTypes) {
    await queryInterface.changeColumn("users", "id", {
      type: dataTypes.UUID,
    });
  },
};
