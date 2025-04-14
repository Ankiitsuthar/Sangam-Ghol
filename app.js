const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// const authRoutes = require('./src/routes/auth');
const bookingRoutes = require('./src/routes/booking');
const contactRoutes = require('./src/routes/contact');
const testimonialRoutes = require('./src/routes/testimonialRoutes');
const appointmentRoutes = require('./src/routes/booking');
const newsletterRoutes = require('./src/routes/newsletter');

const app = express();
app.use(express.json());


// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public'))); // Adjust based on your folder structure

// // Serve the login page at "/"
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html')); // Replace with the actual path to your login page
// });

// Protected route for the main website
app.get('/main', (req, res) => {
    // You can add authentication here to prevent unauthorized access
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Replace with your main website path
});




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// // Set up routes
// app.use('/auth', authRoutes);
// app.use('/bookings', bookingRoutes);
// app.use('/contact', contactRoutes);
// app.use('/gallery', galleryRoutes);


// Use the API routes
// app.use('/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/bookings', appointmentRoutes);
app.use('/api/newsletter', newsletterRoutes);


// //Default route
// // Protected route for the main website
// app.get('/main', (req, res) => {
//     // You can add authentication here to prevent unauthorized access
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); // Replace with your main website path
// });


module.exports = app;
