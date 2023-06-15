const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')

router.get('/current', requireAuth, async (req, res) => {
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
                include: {
                    model: SpotImage,
                    where: { preview: true },
                    attributes: ['url'],
                    required: false
                }
            },
            ReviewImage
        ],
    });

    const reviewsFormatted = reviews.map(review => {
        const { SpotImages, ...spot } = review.Spot.get();
        const previewImage = SpotImages.length > 0 ? SpotImages[0].url : 'default image url';

        return {
            ...review.get(),
            User: review.User.get(),
            Spot: { ...spot, previewImage },
            ReviewImages: review.ReviewImages.map(image => image.get()),
        };
    });

    res.json({ Reviews: reviewsFormatted });
});
