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

      {
        address: "6 E Aspen Ave # 200",
        city: "Flagstaff",
        state: "AZ",
        country: "US",
        lat: 35.198945004398304,
        lng: -111.64829615515893,
        name:"Apple Orchard",
        description: "feel the best vibe after Sedona and grand Canyon trip",
        price: 150.0,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName =  'Spots';
    return queryInterface.bulkDelete(options);
    // throw new Error('testing')
  },
};
