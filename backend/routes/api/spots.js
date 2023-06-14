const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, Review, SpotImage } = require('../db/models');

const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const sequelize = require('sequelize')



const validateCreateSpots = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
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
    include: [
        {
          model: Review,
          attributes: []
        },
        {
          model: SpotImage,
          where: {
            preview: true
          },
          required: false
        }
      ],
  });

  const reviewTotal = 0;
  for (let i = 0; i < spot.Reviews.length; i++){
      reviewTotal+= review[i].star
  }
  const reviewAvg =0;
  if (review.length > 0) {
      reviewAvg = reviewTotal / review.length;
  }

  const spotsFormatted = spots.map(spot => ({
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
            avgRating: reviewAvg
            previewImage ,
        }));

        // return res.json({ Spots: spotsFormatted });
        res.json(spots)
});

// Get all Spots owned by the Current User
router.get("/current", restoreUser, requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
      where: { ownerId: req.user.id },
      include: [
        {
          model: Review,
          attributes: [],
        },
      ],
    });
    const reviewTotal = 0;
    for (let i = 0; i < spot.Reviews.length; i++){
        reviewTotal+= review[i].star
    }
    const reviewAvg =0;
    if (review.length > 0) {
        reviewAvg = reviewTotal / review.length;
    }
    const spotsFormatted = spots.map(spot => ({
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
            avgRating: reviewAvg
            previewImage ,
    }));

    return res.json({ Spots: spotsFormatted });
  });

// Create a Spot
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
      res.status(201).json(newSpot);

  });


module.exports = router;
