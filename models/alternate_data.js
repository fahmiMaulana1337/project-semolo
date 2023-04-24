'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class AlternateData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AlternateData.belongsTo(models.Criteria)
    }
  }
  AlternateData.init(
    {
      data_value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AlternateData',
    }
  )
  return AlternateData
}
