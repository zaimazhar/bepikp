'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipantCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CourseParticipants }) {
      this.belongsTo(CourseParticipants, { foreignKey: 'courseParticipantsId', as: 'courseParticipantsCompanyRelation' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
    }
  };
  ParticipantCompany.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4
      }
    },
    companyName: {
      type: DataTypes.STRING,
    },
    companyPhone: {
      type: DataTypes.STRING,
    },
    companyAttention: {
      type: DataTypes.STRING,
    },
    companyAddress: {
      type: DataTypes.JSON
    },
    companyEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
  }, {
    sequelize,
    modelName: 'ParticipantCompany',
  });
  return ParticipantCompany;
};