'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-876366816069493464/original/a14921fb-2b11-4aa0-ad32-528556218296.jpeg",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/0d58f4c9-6ae2-430b-a1a3-9ab2b7b9f6e3.jpg",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/1bb7152f-a33d-4259-bbab-876a1a95e7e2.jpg",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/6bd407ac-4bf3-48e0-b8fc-2110283dbe51.jpeg",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-29389469/original/5ed29802-44b4-42cb-b452-870a2892df73.jpeg",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-733318328438448084/original/ce2c9ee5-0dc7-4032-8e17-2d17a7a0ba7e.jpeg",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/e4abd7be-db51-4a0d-91d3-0640985281b9.jpg",
      preview: false,
    }
  ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
