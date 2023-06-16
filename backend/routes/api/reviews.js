const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')
const formattedDate = require('../../utils/date.js');

const validateCreateReviews = [
    check("review")
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors,
];

// Get all Reviews of the Current User
router.get('/reviews/current', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {////////how do i check this
      return res.status(404).json({ message: "User couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include:[
                    {
                      model: SpotImage,
                      attributes:['url']
                    }
                  ]

            },
            {
                model: ReviewImage,
                attributes: ['id', 'URL']
            }
        ]
    });

    const reviewsFormatted = reviews.map(review => {
        const previewImageObj = review.Spot.SpotImages.find(image=>image.url)
        //                review is belongs to Spot and Spot and Spot has many SpotImages
        let imageUrl;
      if (previewImageObj) {
      imageUrl = previewImageObj.url;
      }
        return {
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: formattedDate(review.createdAt,true),//review.createdAt is js object since this is in return
          updatedAt: formattedDate(review.updatedAt,true),
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
            previewImage: imageUrl,
          },
          ReviewImages: review.ReviewImages.map(image => ({
            id: image.id,
            url: image.url
          }))
        }
      });

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
      createdAt: formattedDate(new Date(review.createdAt), true),// need to make string to obj
      updatedAt: formattedDate(new Date(review.updatedAt), true),
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

//Create a Review for a Spot based on the Spot's id
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

    const newReview = await Review.create({
      userId: req.user.id,
      spotId,
      review: req.body.review,
      stars: req.body.stars,
    });

    // const newReview = await Review.findOne({
    //     where: { id: review.id }
    //   });//fetch again to modify review style
      const formattedReview = {
        id: newReview.id,
        userId: newReview.userId,
        spotId: newReview.spotId,
        review: newReview.review,
        stars: newReview.stars,
        createdAt: formattedDate(new Date(newReview.createdAt), true),
        updatedAt: formattedDate(new Date(newReview.updatedAt), true),
      }

      res.status(201).json(formattedReview);
  });


// Add an Image to a Review based on the Review's id****how to make it reached
router.post('/reviews/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }///Authorization

    const existingImages = await ReviewImage.findAndCountAll({
      where: { reviewId },
    });

    if (existingImages.count >= 10) {
      return res.status(403).json({ message: "Maximum number of images for this review was reached" });
    }///////////

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

// Edit a Review
router.put('/reviews/:reviewId', requireAuth, validateCreateReviews, async (req, res) => {
    // const {review: newReview, stars} = req.body ,we can alias
    const {review, stars} = req.body
    const reviewId = req.params.reviewId;
    const existingReview = await Review.findByPk(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (existingReview.userId !== req.user.id) {
      return res.status(403).json({ message:"Forbidden"});
    }///Authorization

    existingReview.set({
        //   review: newReview || review.review, if you alias
        review: review || existingReview.review,
        stars: stars || existingReview.stars,
      });

      await existingReview.save();

       const updatedReview = {
        id: existingReview.id,
        spotId: existingReview.spotId,
        userId: existingReview.userId,
        review: existingReview.review,
        stars: existingReview.stars,
        createdAt: formattedDate(new Date(existingReview.createdAt), true),
        updatedAt: formattedDate(new Date(existingReview.updatedAt), true),
      }

    res.json(updatedReview);
});

//   Delete a Review
  router.delete('/reviews/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }//Authorization

    await review.destroy({
        where: {
          id: reviewId,
          userId: userId
        }
      });



    res.json({ message: "Successfully deleted" });
  });


module.exports = router;
