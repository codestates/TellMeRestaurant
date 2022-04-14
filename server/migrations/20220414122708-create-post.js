'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      contents: {
        type: Sequelize.STRING
      },
      imgInfo1: {
        type: Sequelize.STRING
      },
      imgInfo2: {
        type: Sequelize.STRING
      },
      option1: {
        type: Sequelize.STRING
      },
      option2: {
        type: Sequelize.STRING
      },
      option1_count: {
        type: Sequelize.INTEGER
      },
      option2_count: {
        type: Sequelize.INTEGER
      },
      tags: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};