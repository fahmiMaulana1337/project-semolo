'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class scoring extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      scoring.hasMany(models.alternate_data)
      scoring.belongsTo(models.Asset)
    }
  }
  scoring.init(
    {
      criteria: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      value: DataTypes.INTEGER,
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'scoring',
    }
  )
  return scoring
}
