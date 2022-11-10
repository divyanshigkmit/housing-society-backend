const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { hash }= require("bcrypt");

const models = require('../models');

module.exports = {
    createUser: async(req,res)=>{

        const existingUser = await models.User.findOne({where:{email: req.body.email}})
        console.log({existingUser});
          if(req.body.throwError) throw(500)
        if(existingUser)
        {
            return res.status(409).json({message:"User already exist, Please login"})
        }
        const user=await models.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password:await hash(req.body.password,10),
            is_admin:req.body.is_admin, 
        })
          return res.status(201).json({ message: 'User created',user })
    }
}