'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipe.belongsTo(models.User)
      Recipe.belongsTo(models.Asset)
    }
  }
  Recipe.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      asset_id: {
        type: DataTypes.INTEGER,
      },
      total_price: DataTypes.INTEGER,
      deadline: DataTypes.DATE,
      is_active: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Recipe',
      tableName: 'recipes',
      underscored: true,
    }
  )
  return Recipe
}
