/* jshint node: true */
'use strict';
const {
  Model
} = require('sequelize');
const uuid = require('uuid');
const credentials = require('./credentials');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Credentials }) {
      // define association here
      this.hasOne(Credentials, { foreignKey: 'userId', as: 'credential' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
    }
  }
  User.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      notEmpty: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      min: 4
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};