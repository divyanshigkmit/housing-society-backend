const models = require('../models');

module.exports = {
    // create amenity
    createAmenity: async (req, res) => {
        try {
            // check for valid request
            if ((!req.body.name) || (!req.body.price) || (!req.body.is_active)) {
                return res.status(400).json({ message: 'All fields are required!' });
            }

            const existingAmenity = await models.Amenity.findOne({ where: { name: req.body.name } });
            if (existingAmenity) {
                return res.status(409).json({ message: 'Amenity already exist' });
            }
            // create and post amenity 
            const amenity = await models.Amenity.create({
                name: req.body.name,
                price: req.body.price,
                is_active: req.body.is_active,
            });
            return res.status(201).json({ response: amenity });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // update amenity API
    updateAmenity: async (req, res) => {
        try {
            // check for valid request
            const existingAmenity = await models.Amenity.findOne({ where: { id: req.params.id } });
            if (!existingAmenity) return res.status(404).json({ response: 'Amenity not found' });
            // update data
            await models.Amenity.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            const amenity = await models.Amenity.findOne({
                where: {
                    id: req.params.id
                }
            })
            return res.status(202).json({ response: amenity });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // get all amenities API
    getAllAmenity: async (req, res) => {
        try {
            const amenities = await models.Amenity.findAll();
            if (!amenities) return res.status(204).json({ message: 'Content not found' });
            return res.status(200).json({ response: amenities });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // delete amenity API
    deleteAmenity: async (req, res) => {
        try {
            // check for valid request
            const existingAmenity = await models.Amenity.findOne({ where: { id: req.params.id } });
            if (!existingAmenity) return res.status(404).json({ message: 'Amenity not found' });
            // delete amenity
            await models.Amenity.destroy({
                where: {
                    id: req.params.id
                }
            });
            return res.status(202).json({ response: 'Amenity deleted' });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    },

    // get by status API
    getByStatus: async (req, res) => {
        try {
            const status = req.params.status;
            let val;
            val = (status === 'active') ? true : false;

            const amenities = await models.Amenity.findAll({
                where: {
                    is_active: val
                }
            });
            if (!amenities) return res.status(204).json({ message: 'Content not found' });
            return res.status(200).json({ response: amenities });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // get amenity details by id API
    amenityDetailsById: async (req, res) => {
        try {
            // check for valid request
            const existingAmenity = await models.Amenity.findOne({ where: { id: req.params.id } });
            if (!existingAmenity) return res.status(404).json({ response: 'Amenity not found' });
            const amenity = await models.Amenity.findOne({
                where: {
                    id: req.params.id
                },
                include: 'bookings'
            })
            return res.status(200).json({ response: amenity });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }

    }

}