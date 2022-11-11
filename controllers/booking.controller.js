const models = require('../models');


module.exports = {
    // create booking API
    createBooking: async (req, res) => {
        try {
            // check for valid request
            if ((!req.body.user_id) || (!req.body.amenity_id) || (!req.body.booking_date)) {
                return res.status(400).json({ message: 'All fields are required!' });
            }

            const existingBooking = await models.Booking.findOne({
                where: {
                    amenity_id: req.body.amenity_id,
                    booking_date: req.body.booking_date
                }
            });
            if (existingBooking) {
                return res.status(409).json({ message: 'Booking already exist' });
            }
            // create and post booking 
            const booking = await models.Booking.create({
                user_id: req.body.user_id,
                amenity_id: req.body.amenity_id,
                booking_date: req.body.booking_date,
            });
            return res.status(201).json({ response: booking });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // approve or cancel booking API
    bookingStatusUpdate: async (req, res) => {
        try {
            // update data
            const status = req.body.status
            await models.Booking.update({ status: status }, {
                where: {
                    id: req.params.id
                }
            })
            const booking = await models.Booking.findOne({
                where: {
                    id: req.params.id
                }
            })
            return res.status(202).json({ response: booking, message: `Booking ${req.body.status}` });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // get all bookings API
    getAllBookings: async (req, res) => {
        try {
            const bookings = await models.Booking.findAll();
            if (!bookings) return res.status(204).json({ message: 'Content not found' });
            return res.status(200).json({ response: bookings });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // get booking details API
    getBookingDetails: async (req, res) => {
        try {
            const bookingDetails = await models.Booking.findOne({
                where: { id: req.params.id },
                include: 'user'
            })
            return res.status(200).json({ response: bookingDetails });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    },

    // get all booking of particular day
    getBookingsByDay: async (req, res) => {
        try {
            const date = req.params.date;

            const bookings = await models.Booking.findAll({ where: { booking_date: date } });
            return res.status(200).json({ response: bookings });
        } catch (err) {
            return res.status(500).json({ error: 'Something went wrong!' });
        }
    }
}