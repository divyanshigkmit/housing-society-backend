const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/token-validation');
const { verifyUser } = require('../middlewares/user-verification')


router.post("/signup", controllers.createUser);
router.post("/login", controllers.loginUser);
router.patch("/users/:id", checkToken, controllers.updateUser);
router.delete("/users/:id", checkToken, controllers.deleteUser);
router.get("/users", checkToken, verifyUser, controllers.getAllUsers);
router.get("/users/:id", checkToken, verifyUser, controllers.userDetailsById);


module.exports = router;