'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [{
      spotId: 1,
      url: "https://en.wikipedia.org/wiki/House#/media/File:8A,_Bulevardul_Aviatorilor_,_Bucharest_(Romania).jpg",
      preview: true,
    }], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
