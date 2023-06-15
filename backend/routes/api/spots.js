const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')

const validateCreateSpots = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
    check("lat")
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

// Get all Spots
router.get("/", async (req, res) => {
    const spots = await Spot.findAll({
      include: [Review,SpotImage]
    });

    const spotsFormatted = spots.map(spot => {
      let reviewTotal = 0;


      for (let i = 0; i < spot.Reviews.length; i++){
        reviewTotal += spot.Reviews[i].stars;
      }

      let reviewAvg = 0;
      if (spot.Reviews.length > 0) {
        reviewAvg = reviewTotal / spot.Reviews.length;
      }

      const previewImageObj = spot.SpotImages.find(image=>image.preview)
      let imageUrl = "image url";
    if (previewImageObj) {
    imageUrl = previewImageObj.url;
    }
      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: reviewAvg,
        previewImage:imageUrl
      };
    });

    res.json({ Spots: spotsFormatted });
  });


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({///[]array so need to loop
      where: { ownerId: req.user.id },
      include: [Review],
    });

    const spotsFormatted = spots.map(spot => {
        let reviewTotal = 0;
        for (let i = 0; i < spot.Reviews.length; i++){
          reviewTotal += spot.Reviews[i].stars;
        }

        let reviewAvg = 0;
        if (spot.Reviews.length > 0) {
          reviewAvg = reviewTotal / spot.Reviews.length;
        }

        // const previewImageObj = spot.SpotImages.find(image=>image.preview)
        let imageUrl = "image url";
        // if (previewImageObj) {
        // imageUrl = previewImageObj.url;
        // }

        return {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          description: spot.description,
          price: spot.price,
          createdAt: spot.createdAt,
          updatedAt: spot.updatedAt,
          avgRating: reviewAvg,
          previewImage:imageUrl
        };
      });

      res.json({ Spots: spotsFormatted });
  });

//Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId, {
        include: [
            Review,
            SpotImage,
        {
            model: User,
            // as: 'Owner',  // Alias User as Owner
            attributes: ['id', 'firstName', 'lastName']
        }
    ]
});

if (!spot) {
    res.status(404).json({ message: "Spot couldn't be found" });
}

const numReviews = spot.Reviews.length;

   let reviewTotal = 0;
    for (let i = 0; i < spot.Reviews.length; i++){
      reviewTotal += spot.Reviews[i].stars;
    }

    let reviewAvg = 0;
    if (spot.Reviews.length > 0) {
      reviewAvg = reviewTotal / spot.Reviews.length;
    }
const spotsFormatted = {
    id: spot.id,
    ownerId: spot.User.id,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    numReviews: numReviews,
    avgStarRating: reviewAvg,
    SpotImages: spot.SpotImages.map(img => {
        return {
            id: img.id,
            url: img.url,
            preview: img.preview
        }
    }),
    Owner: {
        id: spot.User.id,
        firstName: spot.User.firstName,
        lastName: spot.User.lastName
    }
}

res.json(spotsFormatted);
});


// Create a Spot need to get rid of title and stack************
router.post('/', requireAuth, validateCreateSpots, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

      const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      });

      res.status(201)
      return res.json(newSpot);
  });

    //Add an Image to a Spot based on the Spot's id
  router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Authorization Spot must belong to the current user
    if (spot.ownerId !== req.user.id) {
      res.status(403).json({ message: "Unauthorized to add images to this spot" });
    }

    const image = await SpotImage.create({
      spotId,
      url,
      preview,
    });

    const response = {
        id: image.id,
        url: image.url,
        preview: image.preview
    }

    return res.json(response);
  });

  //Edit a post
  router.put('/:spotId', requireAuth, validateCreateSpots, async (req, res) => {
    const{address, city, state, country,lat,lng,name,description,price} = req.body
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) {//Spot must belong to the current user
      return res.status(403).json({ message: "User is not authorized to edit this spot" });
    }

    spot.set({
        address: address || spot.address,
        city: city || spot.city,
        state: state || spot.state,
        country: country || spot.country,
        lat: lat || spot.lat,
        lng: lng || spot.lng,
        name: name || spot.name,
        description: description || spot.description,
        price: price || spot.price
      });

      await spot.save();

      res.json(spot);
  });

//   Delete a Spot
  router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) { // Spot must belong to the current user
      return res.status(403).json({ message: "User is not authorized to delete this spot" });
    }

    await spot.destroy({
        where: {
          id: spotId,
          ownerId: userId
        }
      });

    res.json({ message: "Successfully deleted" });
});

module.exports = router;
