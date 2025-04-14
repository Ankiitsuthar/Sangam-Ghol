const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    category: String,
    itemName: [String],
    quantity: Number,
    date: Date,
    notes: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
