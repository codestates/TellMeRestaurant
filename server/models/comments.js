const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const comments = sequelize.define(
    "comments",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
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
      text_content: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "comments",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "post_id",
          using: "BTREE",
          fields: [{ name: "post_id" }],
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );

  comments.associate = function (models) {
    comments.belongsTo(models.post, { as: "post", foreignKey: "post_id" });
    comments.belongsTo(models.users, { as: "user", foreignKey: "user_id" });
  };

  return comments;
};
