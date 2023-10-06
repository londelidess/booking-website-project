"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  //production only work render=>NODE_ENV .Users
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    await queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          review: "The view from Coyote Flat was breathtaking! The jet tubs added a touch of luxury. Highly recommended!",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 1,
          review: "The Family Lakehouse was the perfect getaway. Loved the private dock and the nearby Yosemite Park. Will come back!",
          stars: 4,
        },
        {
          spotId: 3,
          userId: 3,
          review: "Oak Tree A-Frame's modern and cozy decor made our stay memorable. Loved the bamboo mattresses and the serene environment.",
          stars: 5,
        },
        {
          spotId: 4,
          userId: 2,
          review: "Staying in Castle in the Sky felt like a dream. The architecture is stunning, and the koi pond was a beautiful touch.",
          stars: 5,
        },
        {
          spotId: 5,
          userId: 2,
          review: "Eagle's Perch-Treehouse offers an unmatched experience. The panoramic view of the Strait of Juan De Fuca was a sight to behold!",
          stars: 5,
        },
        {
          spotId: 6,
          userId: 3,
          review: "The suite in Malibu was elegant and the ocean view was worth every penny. An exquisite Italian villa experience!",
          stars: 5,
        },
        {
          spotId: 7,
          userId: 2,
          review: "Romantic adobe was a historic marvel. The sun lounge with clawfoot bathtubs added a unique touch.",
          stars: 4,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    return queryInterface.bulkDelete(options);
  },
};
