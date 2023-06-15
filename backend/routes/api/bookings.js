const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Sequelize, Op } = require('sequelize');

// const validateCreateBookings = [
//     check("review")
//         .notEmpty()
//         .withMessage('Review text is required'),
//     check('stars')
//         .isInt({ min: 1, max: 5 })
//         .withMessage('Stars must be an integer from 1 to 5'),
//   handleValidationErrors,
// ];

// Get all of the Current User's Bookings***needet to be reformatted for res
router.get('/bookings/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const bookings = await Booking.findAll({
        where: { userId },  // Find all bookings of the current user
        include: [
            {
                model: Spot,
                include: [
                    {
                        model: SpotImage,
                        // where: { preview: true },
                        // required: false
                    }
                ]
            }
        ],
    });

    if (!bookings) {
        return res.status(404).json({ error: 'No bookings found for the current user' });
    }
    const reformattedBookings = bookings.map(booking => {
        const bookingJson = booking.toJSON();  // Convert booking instance to plain object
        if (bookingJson.Spot.SpotImages[0]) {
            bookingJson.Spot.previewImage = bookingJson.Spot.SpotImages[0].url;
        }
        delete bookingJson.Spot.SpotImages;  // Remove SpotImages field
        return bookingJson;
    });

    res.status(200).json({ Bookings: reformattedBookings });
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/spots/:spotId/bookings', requireAuth, async (req, res) => {


    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    let bookings;
    if (spot.ownerId === userId) {
        bookings = await Booking.findAll({
            where: { spotId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                },
            ],
        });

        bookings = bookings.map(booking => {
            const bookingJson = booking.toJSON();
            const { id, spotId, userId, startDate, endDate, createdAt, updatedAt, User } = bookingJson;
            return { User, id, spotId, userId, startDate, endDate, createdAt, updatedAt };
        });

    } else {//////////
        // Current user is not the owner of the Spot
        // Fetch all Bookings without User details
        bookings = await Booking.findAll({
            where: { spotId },
            attributes: ['spotId', 'startDate', 'endDate'],
        });

        // bookings = bookings.map(booking => booking.toJSON());
    }
        res.status(200).json({ Bookings: bookings });
});

//Create a Booking from a Spot based on the Spot's id
router.post('/spots/:spotId/bookings', requireAuth, async (req, res) => {

})

// Delete a Booking
router.delete('/bookings/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId, {
        include: [Spot]
    });

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    const bookingOwner = booking.userId;
    const spotOwner = booking.Spot.ownerId;

    if (userId !== bookingOwner && userId !== spotOwner) {
        return res.status(403).json({ message: "Unauthorized to delete this booking" });
    }

    const currentDate = new Date();
    if (new Date(booking.startDate) < currentDate) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await Booking.destroy({ where: { id: bookingId } });

    return res.status(200).json({ message: "Successfully deleted" });
});


module.exports = router;
