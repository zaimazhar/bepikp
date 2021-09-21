'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CourseParticipants }) {
      this.hasMany(CourseParticipants, { foreignKey: 'courseId', as: 'courseParticipantRelation' })
    }

    toJSON() {
      return { ...this.get(), id: undefined, updatedAt: undefined, createdAt: undefined }
    }
  };
  Courses.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        isUUID: 4
      }
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseStart: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    courseEnd: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    courseCost: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseVenue: {
      type: DataTypes.JSON,
      allowNull: false
    },
    courseStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Courses',
  });
  return Courses;
};