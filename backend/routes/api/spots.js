const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const {sequelize,Op} = require('sequelize')
const formattedDate = require('../../utils/date.js');

const validateCreateSpots = [///this is for body
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
    let { page='1', size='20', minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

    page = parseInt(page);
    size = parseInt(size);

    const where ={};
    const errors = {};

  if (Number.isNaN(page) || page < 1 || page > 10) {
    errors.page = "Page must be greater than or equal to 1 and less than or equal to 10";
  }

  if (Number.isNaN(size) || size < 1 || size > 20) {
    errors.size ="Size must be greater than or equal to 1 and less than or equal to 20";
  }

  if (minLat !== undefined) {
    minLat = parseFloat(minLat);
    if (Number.isNaN(minLat) || minLat < -90 || minLat > 90) {
      errors.minLat = "Minimum latitude is invalid";
    } else {
      where.lat = { [sequelize.Op.gte]: minLat };
    }
  }

  if (maxLat !== undefined) {
    maxLat = parseFloat(maxLat);
    if (Number.isNaN(maxLat) || maxLat < -90 || maxLat > 90) {
      errors.maxLat = "Maximum latitude is invalid";
    } else {
      where.lat = { ...where.lat, [sequelize.Op.lte]: maxLat };
    }
  }

  if (minLng !== undefined) {
    minLng = parseFloat(minLng);
    if (Number.isNaN(minLng) || minLng < -180 || minLng > 180) {
      errors.minLng = "Minimum longitude is invalid";
    } else {
      where.lng = { [sequelize.Op.gte]: minLng };
    }
  }

  if (maxLng !== undefined) {
    maxLng = parseFloat(maxLng);
    if (Number.isNaN(maxLng) || maxLng < -180 || maxLng > 180) {
      errors.maxLng = "Maximum longitude is invalid";
    } else {
      where.lng = { ...where.lng, [sequelize.Op.lte]: maxLng };
    }
  }

  if (minPrice !== undefined) {
    minPrice = parseFloat(minPrice);
    if (Number.isNaN(minPrice) || minPrice < 0) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    } else {
      where.price = { [sequelize.Op.gte]: minPrice };
    }
  }

  if (maxPrice !== undefined) {
    maxPrice = parseFloat(maxPrice);
    if (Number.isNaN(maxPrice) || maxPrice < 0) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    } else {
      where.price = { ...where.price, [sequelize.Op.lte]: maxPrice };
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Bad Request", errors });
  }

    const pagination = {
      limit: size,
      offset: size * (page - 1)
    };

    const spots = await Spot.findAll({
      where,
      include: [Review,SpotImage],
      ...pagination
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

      const previewImageObj = spot.SpotImages.find(image=>image.preview===true)
      let imageUrl = null;
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
        createdAt: formattedDate(spot.createdAt,true),//spot.createdAt is js object since this is in return
        updatedAt: formattedDate(spot.updatedAt,true),
        avgRating: reviewAvg,
        previewImage:imageUrl
        // previewImage: spot.SpotImages[0].url
        //         //belongsTo / hasMany
      };
    });

    res.json({
      Spots: spotsFormatted,
      page,
      size
    });
  });


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({///[]array so need to loop
      where: { ownerId: req.user.id },
      include: [Review,SpotImage],
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

        const previewImageObj = spot.SpotImages.find(image=>image.preview===true)
        let imageUrl = null;
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
          createdAt: formattedDate(spot.createdAt,true),//spot.createdAt is js object since this is in return
        updatedAt: formattedDate(spot.updatedAt,true),
          avgRating: reviewAvg,
          previewImage: imageUrl
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
    createdAt: formattedDate(new Date(spot.createdAt), true),// need to make string to obj
      updatedAt: formattedDate(new Date(spot.updatedAt), true),
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

      const formattedSpot = {
        id: newSpot.id,
        ownerId: newSpot.ownerId,
        address: newSpot.address,
        city: newSpot.city,
        state: newSpot.state,
        country: newSpot.country,
        lat: newSpot.lat,
        lng: newSpot.lng,
        name: newSpot.name,
        description: newSpot.description,
        price: newSpot.price,
        createdAt: formattedDate(new Date(newSpot.createdAt), true),
        updatedAt: formattedDate(new Date(newSpot.updatedAt), true),
      }

      res.status(201).json(formattedSpot);
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
      res.status(403).json({ message: "Forbidden" });
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
      return res.status(403).json({ message: "Forbidden" });
    }//Authorization

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

      const formattedSpot = {
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
        createdAt: formattedDate(new Date(spot.createdAt), true),
        updatedAt: formattedDate(new Date(spot.updatedAt), true),
      }


      res.json(formattedSpot);
  });

//   Delete a Spot
  router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== req.user.id) { // Spot must belong to the current user
      return res.status(403).json({ message: "Forbidden" });//Authorization
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
