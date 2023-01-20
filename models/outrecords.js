'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OutRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OutRecords.init({
    entry_id: DataTypes.INTEGER,
    out_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OutRecords',
  });
  return OutRecords;
};