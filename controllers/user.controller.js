const bcrypt = require('bcrypt');
const { hash } = require("bcrypt");
const jwt = require('jsonwebtoken');

const models = require('../models');

module.exports = {
    // SignUp API
    createUser: async (req, res) => {
        try {
            // check for valid request
            if ((!req.body.first_name) || (!req.body.last_name) || (!req.body.email) || (!req.body.phone) || (!req.body.password)) {
                return res.status(400).json({ message: 'All fields are required!' });
            }

            const existingUser = await models.User.findOne({ where: { email: req.body.email } })
            if (existingUser) {
                return res.status(409).json({ message: 'User with this email or phone already exist' });
            }
            // create and post user 
            const user = await models.User.create({
                attributes: { exclude: ['token', 'is_delete'] },
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                password: await hash(req.body.password, 10)
            })
            return res.status(201).json({ response: user });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // update user API
    updateUser: async (req, res) => {
        try {
            // check for valid request
            const existingUser = await models.User.findOne({ where: { id: req.params.id } });
            if (!existingUser) return res.status(404).json({ response: 'User not found' });
            // update data
            await models.User.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const user = await models.User.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['token', 'is_delete'] }
            })
            return res.status(202).json({ response: user });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // delete user API
    deleteUser: async (req, res) => {
        try {
            // check for valid request
            const existingUser = await models.User.findOne({ where: { id: req.params.id } });
            if (!existingUser) return res.status(404).json({ message: 'User not found' });
            // delete user
            await models.User.update({ is_delete: 'true' }, {
                where: {
                    id: req.params.id
                }
            })
            return res.status(202).json({ response: 'User deleted' });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // get all users API
    getAllUsers: async (req, res) => {
        try {
            const users = await models.User.findAll({ attributes: { exclude: ['token'] } });
            if (!users) return res.status(204).json({ message: 'Content not found' });
            return res.status(200).json({ response: users });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // get user details by id API
    userDetailsById: async (req, res) => {
        try {
            // check for valid request
            const existingUser = await models.User.findOne({ where: { id: req.params.id } });
            if (!existingUser) return res.status(404).json({ response: 'User not found' });
            const user = await models.User.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['token', 'is_delete'] },
                include: 'bookings'
            })
            return res.status(200).json({ response: user });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // login API
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            // check for valid request
            const user = await models.User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ response: 'Wrong email or password' });
            }
            // check for correct password
            const match = await bcrypt.compareSync(password, user.password)
            if (!match) {
                return res.status(401).json({ response: 'Wrong email or password' })
            }
            // jwt token assignment
            const jsonToken = jwt.sign({ email: email }, process.env.secretKey);
            const expirationTime = (Date.now() + (1 * 60 * 60 * 1000));
            await models.User.update({ token: jsonToken, token_expiration: expirationTime }, {
                where: {
                    id: user.id
                }
            })
            return res.status(200).json({ token: jsonToken });

        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }
}


