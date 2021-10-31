"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Benefits extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Courses }) {
			this.belongsTo(Courses, { foreignKey: 'courseId' })
		}

    toJSON() {
      return { ...this.get(), id: undefined, courseId: undefined, updatedAt: undefined, createdAt: undefined }
    }
	}
	Benefits.init(
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				validate: {
					isUUID: 4,
				},
			},
      benefits: {
        type: DataTypes.STRING,
        allowNull: false,
      }
		},
		{
			sequelize,
			modelName: "Benefits",
		}
	);
	return Benefits;
};
