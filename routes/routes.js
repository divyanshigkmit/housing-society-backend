const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user.controller');


router.post("/signup", controllers.createUser);
router.patch("/users/:id", controllers.updateUser);
router.delete("/users/:id", controllers.deleteUser);
router.get("/users", controllers.getAllUsers);
router.get("/users/:id", controllers.userDetailsById);
router.post("/login", controllers.loginUser);

module.exports=router;