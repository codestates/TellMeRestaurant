const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const post = sequelize.define(
    "post",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      contents: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imgInfo1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      imgInfo2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      option1_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      option2_count: {
        type: DataTypes.INTEGER,
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
      tags: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "post",
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
      ],
    }
  );
  post.associate = function (models) {
    post.hasMany(models.comments, { as: "comments", foreignKey: "post_id" });
    post.hasMany(models.voter, { as: "voters", foreignKey: "voting_id" });

    post.belongsTo(models.users, { as: "user", foreignKey: "user_id" });
  };

  return post;
};
