'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {//production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA;// define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, [
      {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/ed02b81f-ae67-4058-83b4-a536508fe551.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/1ade03b9-4979-429c-8d56-143edddd6d17.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/5862295e-2ac1-477d-a372-05d8a3d62428.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/86584112-fd50-4217-b089-96543f824693.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51363650/original/bd2f8382-4437-427d-b4a2-86b166e9a4d4.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/be1c6bbb-09f4-4f62-9648-65815496c68c.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-710683706309768400/original/2f65bf3b-11c9-4078-96ae-d5d6ca66c9c3.jpeg?im_w=720",
      preview: false,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-710683706309768400/original/b279a64e-7b2f-4d91-905c-10ba399d8ff1.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-710683706309768400/original/76e64864-0ce7-424b-b9de-e696499d3cd2.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-710683706309768400/original/b36b837d-4a58-480f-bbc7-16ab6ac63a78.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/52c83c5e-88b8-4d81-adda-81dd9907417f.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/491f98fb-21be-4c97-8d31-c74d28685881.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/a1e74d9d-5089-44c3-86c4-0d3f204cfcec.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/614afd8e-27fd-4a0c-a1cb-27d2843a694b.jpg?im_w=1440",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/0794fd64-f9ec-42f5-b593-0462b837e0e8.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/88c19972-7e84-4f97-8c95-3f25a5463baf.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/03acba6e-be18-44b0-afec-2fd03e6ee599.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/6d89a819-82ae-4741-882c-1ee298bcd31d.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/0a15bdb1-7871-4f53-9b56-d361d99934dc.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/2bce86e7-1231-415b-961a-37eebba10f41.jpg?im_w=720",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/3053f0e2-ee01-4d33-be67-2b7d3724e447.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/d4a7343f-6475-4e58-a3ce-0e28599a7ea2.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/a1617332-0190-42e7-8770-7d69419780ae.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/c7fc8d28-781e-4dc5-a95d-07924e8a2260.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-18994970/original/fd0145c7-236e-4230-855d-3e0829b845a2.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-924900594479808033/original/5aa40762-2552-4e00-88c1-9899472c8645.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-924900594479808033/original/8a658609-26cd-4079-8310-a0ca76a307cd.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-924900594479808033/original/e98e53ca-7898-4352-953a-26c87b53997e.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-924900594479808033/original/ff7bce68-7104-43ff-b51b-4db3865c9bd9.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-924900594479808033/original/73ea295c-17c4-4abb-9e5a-c90d7f42b6e5.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44431270/original/c7bad1b1-2f41-4f2e-be7b-29558f48a4e5.jpeg?im_w=1200",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44431270/original/8b06109d-bc5d-4e14-885c-278a2e69bb4c.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44431270/original/520ad5f2-a6c2-497c-a6ec-f7b1aedcac81.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44431270/original/c4136283-a805-4f17-99c8-aee4a68f8cd1.jpeg?im_w=720",
      preview: true,
    },
    {
      spotId: 7,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-44431270/original/9afb62ea-9912-4bbc-a0bc-96e391095aa4.jpeg?im_w=720",
      preview: true,
    },
  ], {});

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options);
  }
};
