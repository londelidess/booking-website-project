const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')

// Delete a Spot Image
router.delete('/spot-images/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const userId = req.user.id;

    const spotImage = await SpotImage.findByPk(imageId, {
        include: [
            {
                model: Spot,
                where: { ownerId: userId }, // make sure the Spot belongs to the current user
            },
        ],
    });

    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found or user is not authorized to delete this image" });
    }

    await SpotImage.destroy({
      where: {
        id: imageId,
      }
    });

    res.json({ message: "Successfully deleted" });
});

// Delete a Review Image
router.delete('/review-images/:imageId', requireAuth, async (req, res) => {
    const imageId = parseInt(req.params.imageId, 10);
    const userId = req.user.id;

    const reviewImage = await ReviewImage.findByPk(imageId, {
        include: [
            {
                model: Review,
                where: { userId: userId },
            },
        ],
    });

    if (!reviewImage) {
      return res.status(404).json({ message: "Review Image couldn't be found or user is not authorized to delete this image" });
    }

    await ReviewImage.destroy({
      where: {
        id: imageId,
      }
    });

    res.json({ message: "Successfully deleted" });
});

module.exports = router;
