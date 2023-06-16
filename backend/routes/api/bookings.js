const express = require("express");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Spot, User, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Sequelize, Op } = require('sequelize');
const formattedDate = require('../../utils/date.js');


const validateCreateBookings = [
    check("review")
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
  handleValidationErrors,
];

// Get all of the Current User's Bookings
router.get('/bookings/current', requireAuth, async (req, res) => {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User couldn't be found" });
    }

    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Spot,
          attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
          include: [
            {
              model: SpotImage,
              attributes: ['url'],
            }
          ]
        }
      ]
    });

    const bookingsFormatted = bookings.map(booking => ({
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.SpotImages[0].url
                //belongsTo / hasMany
      },
      userId: booking.userId,
      startDate: formattedDate(new Date(booking.startDate)),// converting string to js Date obj since it's in map argument. wanna change str to obj
      endDate: formattedDate(new Date(booking.endDate)),
      createdAt: formattedDate(new Date(booking.createdAt), true),
      updatedAt: formattedDate(new Date(booking.updatedAt), true)
    }));

    res.json({ Bookings: bookingsFormatted });
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
