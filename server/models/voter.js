const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const voter = sequelize.define(
    "voter",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      voting_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "post",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      options_check: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "voter",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "voting_id",
          using: "BTREE",
          fields: [{ name: "voting_id" }],
        },
      ],
    }
  );

  voter.associate = function (models) {
    voter.belongsTo(models.post, { as: "voting", foreignKey: "voting_id" });

    voter.belongsTo(models.users, { as: "user", foreignKey: "user_id" });
  };
  return voter;
};
