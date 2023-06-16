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
              attributes:['url','preview'],
            }
          ]
        }
      ]
    });

  const bookingsFormatted = bookings.map(booking => {
    const previewImageObj = booking.Spot.SpotImages.find(image => image.preview === true);
    let imageUrl;
      if (previewImageObj) {
        imageUrl = previewImageObj.url;
      }

    return {
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
        previewImage: imageUrl
      },
      userId: booking.userId,
      startDate: formattedDate(new Date(booking.startDate)),
      endDate: formattedDate(new Date(booking.endDate)),
      createdAt: formattedDate(new Date(booking.createdAt), true),
      updatedAt: formattedDate(new Date(booking.updatedAt), true)
    };
  });

  res.json({ Bookings: bookingsFormatted });
});

// Get all bookings for a Spot based on the Spot's id
router.get('/spots/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    //If user is not the owner of the spot
    if (spot.ownerId !== req.user.id) {
        const bookings = await Booking.findAll({
            where: { spotId },
            attributes: ['spotId', 'startDate', 'endDate'],
        });

        const formattedBookings = bookings.map(booking => {
            return {
                spotId: booking.spotId,
                startDate: formattedDate(booking.startDate),
                endDate: formattedDate(booking.endDate),
            }
        });
        return res.status(200).json({ Bookings: formattedBookings });///
    }

    //If user is the owner of the spot
    else {
        const bookings = await Booking.findAll({
            where: { spotId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        });

        const formattedBookings = bookings.map(booking => {
            return {
                User: {
                    id: booking.User.id,
                    firstName: booking.User.firstName,
                    lastName: booking.User.lastName
                },
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: formattedDate(booking.startDate),
                endDate: formattedDate(booking.endDate),
                createdAt: formattedDate(booking.createdAt,true),//review.createdAt is js object since this is in return
                updatedAt: formattedDate(booking.updatedAt,true),
            }
        });

        return res.status(200).json({ Bookings: formattedBookings });
    }
});

//Create a Booking from a Spot based on the Spot's id
router.post('/spots/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (startDate >= endDate) {//dates format "YYYY-MM-DD", this comparison still works
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    }

    //  booking conflict
    const bookingConflict = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [
                {
                    startDate: {
                        [Op.lte]: new Date(endDate),
                        [Op.gte]: new Date(startDate),
                    }
                },
                {
                    endDate: {
                        [Op.lte]: new Date(endDate),
                        [Op.gte]: new Date(startDate),
                    }
                }
            ]
        }
    });

    if (bookingConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    }

    const booking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
    });

    const formattedBooking = {
        id: booking.id,
        spotId: booking.spotId,///this is string somehow so parseInt the top
        userId: booking.userId,
        startDate: formattedDate(booking.startDate),
        endDate: formattedDate(booking.endDate),
        createdAt: formattedDate(booking.createdAt,true),
        updatedAt: formattedDate(booking.updatedAt,true),
    };

    return res.status(200).json(formattedBooking);
});

// Edit a Booking
router.put('/bookings/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== userId) {
        return res.status(403).json({ message:"Forbidden"});
    }///Authorization

    if (startDate >= endDate) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                "endDate": "endDate cannot come before startDate"
            }
        });
    }

    const currentDate = new Date();
    if (endDate < formattedDate(currentDate)) {
        // if(new Date(endDate).toISOString() < new Date().toISOString()){
        return res.status(403).json({ message: "Past bookings can't be modified" });
    }

    const bookingConflict = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            id: { [Op.ne]: bookingId },  // exclude the  booking referring now
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },//check it is between existing bookings
                { endDate: { [Op.between]: [startDate, endDate] } },
            ],
        },
    });

    if (bookingConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        });
    }

    booking.set({
        startDate: startDate || booking.startDate,
        endDate: endDate || booking.endDate,
    });
    await booking.save();

    return res.json({
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: formattedDate(booking.startDate),
        endDate: formattedDate(booking.endDate),
        createdAt: formattedDate(booking.createdAt, true),
        updatedAt: formattedDate(booking.updatedAt, true),
    });
});

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
        return res.status(403).json({ message: "Forbidden" });
    }//Authorization

    const currentDate = new Date();
    if (formattedDate(booking.startDate) < formattedDate(currentDate)) {//comparing string
        return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    }

    await Booking.destroy({ where: { id: bookingId } });

    return res.status(200).json({ message: "Successfully deleted" });
});


module.exports = router;
