'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete: 'CASCADE',
      },
      address: {
        type: Sequelize.STRING(250),
        allowNull:false,
      },
      city: {
        type: Sequelize.STRING(150),
        allowNull:false,

      },
      state: {
        type: Sequelize.STRING(50),
        allowNull:false,

      },
      country: {
        type: Sequelize.STRING(50),
        allowNull:false,

      },
      lat: {
        type: Sequelize.DECIMAL(20,14),
        allowNull:false,

      },
      lng:{
        type: Sequelize.DECIMAL(20,14),
        allowNull:false,

      },
      description: {
        type: Sequelize.STRING(200),
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull:false,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    await queryInterface.dropTable(options);
  }
};
