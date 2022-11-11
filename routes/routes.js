const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controller');
const amenityControllers = require('../controllers/amenity.controller');
const bookingControllers = require('../controllers/booking.controller');
const { checkToken } = require('../middlewares/token-validation');
const { verifyUser } = require('../middlewares/user-verification');

// user routes
router.post('/signup', checkToken, verifyUser, userControllers.createUser);
router.post('/login', userControllers.loginUser);
router.patch('/users/:id', checkToken, userControllers.updateUser);
router.delete('/users/:id', checkToken, userControllers.deleteUser);
router.get('/users', checkToken, verifyUser, userControllers.getAllUsers);
router.get('/users/:id', checkToken, verifyUser, userControllers.userDetailsById);

// amenity routes
router.post('/amenities', checkToken, verifyUser, amenityControllers.createAmenity);
router.patch('/amenities/:id', checkToken, verifyUser, amenityControllers.updateAmenity);
router.delete('/amenities/:id', checkToken, verifyUser, amenityControllers.deleteAmenity);
router.get('/amenities', checkToken, amenityControllers.getAllAmenity);
router.get('/filterAmenities/:status', checkToken, amenityControllers.getByStatus);
router.get('/amenities/:id', checkToken, verifyUser, amenityControllers.amenityDetailsById);

// booking routes
router.post('/bookings', checkToken, bookingControllers.createBooking);
router.patch('/bookings/:id', checkToken, verifyUser, bookingControllers.bookingStatusUpdate);
router.get('/bookings', checkToken, verifyUser, bookingControllers.getAllBookings);
router.get('/bookings/:id', checkToken, verifyUser, bookingControllers.getBookingDetails);
router.get('/filterBookings/:date', checkToken, verifyUser, bookingControllers.getBookingsByDay);

module.exports = router;