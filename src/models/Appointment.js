const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    type: String,
    date: Date,
    category: String,
    itemName: String,
    notes: String,
});

module.exports = mongoose.model('Appointment', bookingSchema);
