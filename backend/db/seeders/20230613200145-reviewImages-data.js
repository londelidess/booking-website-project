
'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, [{
      reviewId: 1,
      url: "https://example.com/reviewImage1.jpg",
    }], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, null, {});
  }
};
