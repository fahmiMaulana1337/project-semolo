'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wakaf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      wakaf.hasMany(models.distribution)
    }
  }
  wakaf.init({
    name: DataTypes.STRING,
    gender: DataTypes.ENUM,
    address: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'wakaf',
  });
  return wakaf;
};