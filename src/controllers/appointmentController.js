const Appointment = require('../models/Appointment');


exports.createBooking = async (req, res) => {
    try {
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Appointment', error });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
