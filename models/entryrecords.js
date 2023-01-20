'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntryRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EntryRecords.init({
    patient_id: DataTypes.INTEGER,
    entry_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'EntryRecords',
  });
  return EntryRecords;
};