'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Recipe)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Email is required'
        },
        isEmail:{
          msg: 'Email format is invalid'
        },
        notNull:{
          msg: 'Email is required'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Password is required'
        },
        notNull:{
          msg: 'Password is required'
        }
      }
    },
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Role is required'
        },
        notNull:{
          msg: 'Role is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};