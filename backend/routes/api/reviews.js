const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')

const validateCreateReviews = [
    check("review")
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors,
];

// Get all Reviews of the Current User****resource required
router.get('reviews/current', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User couldn't be found" });
    }

    const reviews = await user.getReviews({//lazy loading
      include: [
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });

    const reviewsFormatted = reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName
      },
      Spot: {
        id: review.Spot.id,
        ownerId: review.Spot.ownerId,
        address: review.Spot.address,
        city: review.Spot.city,
        state: review.Spot.state,
        country: review.Spot.country,
        lat: review.Spot.lat,
        lng: review.Spot.lng,
        name: review.Spot.name,
        price: review.Spot.price,
        previewImage: review.Spot.previewImage
      },
      ReviewImages: {
        id: image.id,
        url: image.url
      }
    }));

    res.json({ Reviews: reviewsFormatted });
  });
// Get all Reviews by a Spot's id
  router.get('/spots/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;
    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });

    if (!reviews.length) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviewsFormatted = reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      spotId: review.spotId,
      review: review.review,
      stars: review.stars,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      User: {
        id: review.User.id,
        firstName: review.User.firstName,
        lastName: review.User.lastName
      },
      ReviewImages: review.ReviewImages.map(image => ({
        id: image.id,
        url: image.url
      }))
    }));

    res.json({ Reviews: reviewsFormatted });
  });

//Create a Review for a Spot based on the Spot's id****title and stack need to be excluded for the error 400

router.post('/spots/:spotId/reviews', requireAuth, validateCreateReviews, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId: req.user.id
      }
    });

    if (existingReview) {
      return res.status(500).json({ message: "User already has a review for this spot" });
    }

    const review = await Review.create({
      userId: req.user.id,
      spotId,
      review: req.body.review,
      stars: req.body.stars
    });

    res.status(201).json(review);
  });


// Add an Image to a Review based on the Review's id****how to make it reached
router.post('/reviews/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized to add images to this review" });
    }

    const existingImages = await ReviewImage.findAndCountAll({
      where: { reviewId },
    });

    if (existingImages.count >= 10) {
      return res.status(403).json({ message: "Maximum number of images for this review was reached" });
    }

    const image = await ReviewImage.create({
      reviewId,
      url: req.body.url,
    });

    const response = {
        id:image.reviewId,
        url:image.url
    }

    res.json(response);
  });

// Edit a Review ***unexpected token
router.put('/reviews/:reviewId', requireAuth, validateCreateReviews, async (req, res) => {
    const {newReview, stars} = req.body
    const reviewId = parseInt(req.params.reviewId, 10);
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized to edit this review" });
    }

    review.set({
        review: newReview || review.review,
        stars: stars || review.stars,
      });

      await spot.save();

    res.json(review);
  });

//   Delete a Review
  router.delete('/reviews/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "User is not authorized to delete this review" });
    }

    await review.destroy({
        where: {
          id: reviewId,
          userId: userId
        }
      });

    res.json({ message: "Successfully deleted" });
  });


module.exports = router;
