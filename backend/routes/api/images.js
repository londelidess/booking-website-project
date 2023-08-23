const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const sequelize = require('sequelize')
const { multipleFilesUpload, multipleMulterUpload, retrievePrivateFile, deleteFile } = require("../../awsS3");

//Get all images
router.get(
  '/:spotId',
  async (req, res) => {
    const images = await SpotImage.findAll({where: { spotId: req.params["spotId"] }});
    const imageObjects = images.map(image => {
      return {
        id: image.id,
        url: retrievePrivateFile(image.key)
      };
    });

    return res.json(imageObjects);
  }
);

// Delete a Spot Image
router.delete('/spot-images/:imageId', requireAuth, async (req, res) => {
    const imageId = parseInt(req.params.imageId,10)
    const userId = req.user.id;

    const spotImage = await SpotImage.findByPk(imageId, {
        include: [
            {
                model: Spot,
                where: { ownerId: userId },
      // make sure the Spot belongs to the current user
            },
        ],
    });

    if (!spotImage) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    if (spotImage.Spot.ownerId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    } // Authorization

    await SpotImage.destroy(// delete spotimages only user is the owner
        {
        where: {
          id: imageId
        }
      }
    );
    // await spotImage.destroy() deleting spotimages regardless owner
    res.json({ message: "Successfully deleted" });
});

// Delete a Review Image
router.delete('/review-images/:imageId', requireAuth, async (req, res) => {
    const imageId = parseInt(req.params.imageId,10);
    const userId = parseInt(req.user.id,10);

    const reviewImage = await ReviewImage.findByPk(imageId, {
        include: [
            {
                model: Review,
                where: { userId: userId },
            },
        ],
    });

    if (!reviewImage) {
      return res.status(404).json({ message: "Review Image couldn't be found" });
    }

    if (reviewImage.Review.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    } // Authorization

    await ReviewImage.destroy(
      {
        where: {
          id: imageId
        }
      }
    );
    // await reviewImage.destroy()
    res.json({ message: "Successfully deleted" });
});

module.exports = router;
