const express = require('express');
const router = express.Router();

const controllers = require('../controllers/user.controller');


router.post("/users/signUp/", controllers.createUser);

module.exports=router;