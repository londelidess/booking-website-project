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
        ownerId:2,
        address: "42556 Bear Loop",
        city: "Big Bear",
        state: "California",
        country: "United States of America",
        lat: 34.26330546541334,
        lng: -116.87415247662786,
        name: "Coyote Flat - 5BR/4BA/WiFi/JetTubs/Barbeque",
        description: "Newly remodeled log style home with luxury flare. A spacious two-story property with beautiful cathedral wood ceilings and large picture windows with gorgeous views. Nearby the lake, grocery stores, Alpine Pedal Path, and Snow Play. A short drive to the Village, ski resorts, Alpine Zoo, golf course, and more!",
        price: 589,
      },
      {
        ownerId:3,
        address: "19585 Pleasantview Dr",
        city: "Groveland",
        state: "California",
        country: "United States of America",
        lat: 37.850056147734456,
        lng: -120.20752910908644,
        name: "Family Lakehouse w/ Private Dock & Swim!",
        description: "Treat yourself and your family to a private dock on Pine Mountain Lake with incredible outdoor space and amenities. Features unique architecture, endless entertainment options, and a gourmet kitchen. Take a day trip to Yosemite (30mins away) and return to your home-away-from-home to relax the night away! This is a residential neighborhood so, before clicking  insta book, please note the house rules regarding quiet time and note that sound carries along the water surface.",
        price: 855,
      },
      {
        ownerId:2,
        address: "27709 W Shore Rd",
        city: "Lake Arrowhead",
        state: "California",
        country: "United States of America",
        lat: 34.26783917301845,
        lng: -117.198831574865,
        name: "Oak Tree A-Frame",
        description: "very beautiful detail was planned with you in mind, because our passion is creating places for inviting people!  Modern, Scandinavian, and mid-century inspired décor is as inviting and cozy as it is magazine worthy.  We can't wait to hear you rave about our bamboo mattresses, butter soft bamboo sheets, and the best sleep you've had in a long time! Your first stay with us certainly won't be your last!",
        price: 285,
    },
    {
        ownerId:1,
        address: "Castle in the Sky -- An Enchanted Getaway",
        city: "Running Springs",
        state: "California",
        country: "United States of America",
        lat: 34.20199965432658,
        lng:  -117.0932588532786,
        name: "Empire State Building",
        description: "With Disney-inspired architecture and peaceful forested location, the Castle in the Sky is the enchanted mountain getaway you’ve always dreamt of. Relax by the koi pond, or enjoy the mountain scenery from the Keep or many viewing decks. The Castle not only provides the rustic cabin feel but also shares the comforts of a modern home: highspeed Wifi, TV streaming, smart thermostats, and more. We are excited to share our home with you and hope you will join us for an unforgettable experience!",
        price: 449,
    },
    {
        ownerId:1,
        address: "868 Gehrke Rd",
        city: "Port Angeles",
        state: "Washington",
        country: "United States of America",
        lat: 48.12119585248207,
        lng: -123.28829907880433,
        name: "Eagle's Perch-Treehouse over the Water-Sauna",
        description: "Soaring 20ft high, this stunning cedar tree house overlooking over the Strait of Juan De Fuca is an absolute Northwest experience. Once inside you'll never want to leave as the floor-to-ceiling window provides an ever-changing panoramic viewscape of cruise ships, wildlife & mountains, with bald eagles soaring across your window.",
        price: 419,
    },
    {
        ownerId:1,
        address: "18034 Coastline Dr",
        city: "Malibu",
        state: "California",
        country: "United States of America",
        lat: 34.04187089950493,
        lng:  -118.56862326339642,
        name: "Main suite with million $ view",
        description: "Welcome to our exquisite Italian villa, where luxury meets tranquility. Nestled in a breathtaking location, our master suite offers an unparalleled experience with its awe-inspiring ocean views. Step inside and indulge in the ultimate retreat, where every corner is adorned with elegance and comfort.",
        price: 330,
    },
    {
      ownerId:1,
      address: "5 Dolores Rd",
      city: "Embudo",
      state: "New Mexico",
      country: "United States of America",
      lat: 36.2745350941188,
      lng:  -105.78580846154678,
      name: "Romantic adobe, river retreat with outdoor tubs.",
      description: "Authentic and historic adobe home. Ideal for your honeymoon, weekend get away or retreat. Complete with very private sun lounge featuring clawfoot bathtubs.  Both, running hot and cold water. Perfect, no matter the season! A short 15 minute distance from town for a quiet escape and easy access to convenience. Located by farmers market, wine vineyards and boutique shopping.",
      price: 297,
    }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName =  'Spots';
    return queryInterface.bulkDelete(options);
    // throw new Error('testing')
  },
};
