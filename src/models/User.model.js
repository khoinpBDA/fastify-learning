const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      name: {
        type: Sequelize.STRING(255),
      },
      status: {
        type: Sequelize.INTEGER,
      }
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false,
    }
  );
  return User;
};
