const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/token-validation');
const { verifyUser } = require('../middlewares/user-verification');
const amenityControllers = require('../controllers/amenity.controller');

// user routes
router.post('/signup', userControllers.createUser);
router.post('/login', userControllers.loginUser);
router.patch('/users/:id', checkToken, userControllers.updateUser);
router.delete('/users/:id', checkToken, userControllers.deleteUser);
router.get('/users', checkToken, verifyUser, userControllers.getAllUsers);
router.get('/users/:id', checkToken, verifyUser, userControllers.userDetailsById);

// amenity routes
router.post('/amenities', amenityControllers.createAmenity);
router.patch('/amenities/:id', amenityControllers.updateAmenity);
router.delete('/amenities/:id', amenityControllers.deleteAmenity);
router.get('/amenities', amenityControllers.getAllAmenity);
router.get('/amenities?status={status}', amenityControllers.getByStatus);
router.get('/amenities/:id', amenityControllers.amenityDetailsById);

module.exports = router;