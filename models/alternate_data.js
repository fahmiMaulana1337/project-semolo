'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class alternate_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      alternate_data.belongsTo(models.scoring)
    }
  }
  alternate_data.init(
    {
      data_value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'alternate_data',
    }
  )
  return alternate_data
}
