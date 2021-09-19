'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Credentials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
    }
  }
  Credentials.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Credentials',
    tableName: 'credentials'
  });

  return Credentials;
};