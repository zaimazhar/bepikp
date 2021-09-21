'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Courses, ParticipantCompany }) {
      this.belongsTo(Courses, { foreignKey: 'courseId', as: 'userCourseRelation' })
      this.hasOne(ParticipantCompany, { foreignKey: 'courseParticipantsId', as: 'courseParticipantsCompanyRelation' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
    }
  };
  CourseParticipants.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4
      }
    },
    participantFullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    participantAddress: {
      type: DataTypes.JSON,
    },
    participantId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 12,
      }
    },
    participantPhone: {
      type: DataTypes.STRING
    },
    participantEmail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  }, {
    sequelize,
    modelName: 'CourseParticipants',
  });
  return CourseParticipants;
};