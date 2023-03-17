'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Asset.hasMany(models.Recipe);
    }
  }
  Asset.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING,
    rate: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};