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
        ownerId:1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId:2,
        address: "1400 W Mars Hill Rd",
        city: "Flagstaff",
        state: "Arizona",
        country: "United States of America",
        lat: 35.20289003388981,
        lng:  -111.6646364179738,
        name: "Lowell Observatory",
        description: "Place where real life lives",
        price: 90,
      },
      {
        ownerId:3,
        address: "111 E Las Olas Blvd",
        city: "Fort Lauderdale",
        state: "Florida",
        country: "United States of America",
        lat: 26.119269,
        lng: -80.14181,
        name: "Broward College",
        description: "Place where leaders are nurtured",
        price: 150,
    },
    {
        ownerId:1,
        address: "350 Fifth Ave",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 40.748817,
        lng: -73.985428,
        name: "Empire State Building",
        description: "An iconic skyscraper",
        price: 200,
    },
    {
        ownerId:2,
        address: "1073 5th Ave",
        city: "San Diego",
        state: "California",
        country: "United States of America",
        lat: 32.721379,
        lng: -117.161897,
        name: "The New Children's Museum",
        description: "A place for creativity and imagination",
        price: 80,
    },
    {
        ownerId:3,
        address: "151 3rd St",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.785719,
        lng: -122.401039,
        name: "San Francisco Museum of Modern Art",
        description: "Artistic inspiration for all ages",
        price: 120,
    },
    {
      ownerId:1,
      address: "221B Baker Street",
      city: "London",
      state: "Greater London",
      country: "United Kingdom",
      lat: 51.5237,
      lng: -0.158553,
      name: "Sherlock Holmes' Home",
      description: "Home of the famous fictional detective Sherlock Holmes",
      price: 130,
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName =  'Spots';
    return queryInterface.bulkDelete(options);
    // throw new Error('testing')
  },
};
