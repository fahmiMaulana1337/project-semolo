'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User);
      Recipe.belongsTo(models.Asset);

      
    }
  }
  Recipe.init({
    UserId: {
      type:DataTypes.INTEGER,
      references:{
        model:'Users',
        key:'id'
      }
    },
    AssetId:  {
      type:DataTypes.INTEGER,
      references:{
        model:'Assets',
        key:'id'
      }
    },
    totalPrice: DataTypes.INTEGER,
    deadline: DataTypes.DATE,
    isActive:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};