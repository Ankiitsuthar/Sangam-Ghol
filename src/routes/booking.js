const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const appointmentController = require('../controllers/appointmentController');

router.post('/items', bookingController.createBooking);
router.get('/items', bookingController.getBookings);

router.post('/appointments', appointmentController.createBooking);
router.get('/appointments', appointmentController.getBookings);


module.exports = router;
