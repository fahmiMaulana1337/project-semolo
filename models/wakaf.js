'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Wakaf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wakaf.belongsTo(models.Fund, { foreignKey: 'fund_id' })
    }
  }
  Wakaf.init(
    {
      fund_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'funds',
          key: 'id',
        },
      },
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      is_active: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Wakaf',
      tableName: 'wakafs',
      underscored: true,
    }
  )
  return Wakaf
}
