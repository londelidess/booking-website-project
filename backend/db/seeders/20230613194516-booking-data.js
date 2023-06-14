'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options, [{
      spotId: 1,
      userId: 1,
      startDate: new Date(),
      endDate: new Date(),
    }], {});
   },

   async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    // const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options);
  }
 };
