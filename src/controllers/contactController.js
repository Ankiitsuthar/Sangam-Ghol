const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Contact form submitted successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting contact form', error });
    }
};
