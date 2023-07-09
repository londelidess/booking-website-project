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
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-733318328438448084/original/ce2c9ee5-0dc7-4032-8e17-2d17a7a0ba7e.jpeg",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/e4abd7be-db51-4a0d-91d3-0640985281b9.jpg",
      preview: false,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-45380567/original/cb33b083-1f45-46f7-af85-58689ad5b86c.jpeg",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/ed02b81f-ae67-4058-83b4-a536508fe551.jpeg",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-676973651361043142/original/350314aa-4d81-40ad-80f9-293e08fd24c3.jpeg",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-909399031194511254/original/cc529591-35d4-4042-a413-fabf037cab9c.jpeg",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-753754071661415317/original/6d9af21a-8953-4726-8cb1-3698d525ddc1.jpeg?im_w=720",
      preview: true,
    },
  ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
