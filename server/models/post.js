'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    imgInfo1: DataTypes.STRING,
    imgInfo2: DataTypes.STRING,
    option1: DataTypes.STRING,
    option2: DataTypes.STRING,
    option1_count: DataTypes.INTEGER,
    option2_count: DataTypes.INTEGER,
    tags: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};