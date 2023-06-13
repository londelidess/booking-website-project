"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      //   {

      //     address: '2-3-19 Asakusa',
      //     city: 'Taito',
      //     state: 'Tokyo',
      //     country: 'Japan',
      //     lat: 35.71365872529517,
      //     lng: 139.7942737932121,
      //     description: 'Central Asakusa',
      //     price: 100.00,
      // },
      // {
      //   address: '262 Lac Long Quan, Phuong 5, Quan 11',
      //   city: 'Thanh pho',
      //   state: 'Ho Chi Minh',
      //   country: 'Vietnam',
      //   lat: 10.76651264051985,
      //   lng: 106.64192355654245,
      //   description: 'next to Dam Sen: old popular theme park in Saigon ',
      //   price: 50.00,
      // },
      {
        address: "6 E Aspen Ave # 200",
        city: "Flagstaff",
        state: "AZ",
        country: "US",
        lat: 35.198945004398304,
        lng: -111.64829615515893,
        description: "feel the best vibe after Sedona and grand Canyon trip",
        price: 150.0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName =  'Spots';
    return queryInterface.bulkDelete(options, null, {});
  },
};
