// const Newsletter = require('../models/Newsletter');

// exports.subscribeNewsletterForm = async (req, res) => {
//     try {
//         const newsletter = new Newsletter(req.body);
//         await newsletter.save();
//         res.status(201).json({ message: 'Newsletter Subscription successful', newsletter });
//     } catch (error) {
//         res.status(500).json({ message: 'Error subscribing', error });
//     }
// };


// backend/controllers/newsletterController.js
const Newsletter = require('../models/Newsletter');

exports.subscribeNewsletterForm = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }
  
  try {
    // Check if the email is already subscribed
    const existingnewsletter = await Newsletter.findOne({ email });
    if (existingnewsletter) {
      return res.status(400).json({ message: "This email is already subscribed." });
    }
    
    // Save the new subscription
    const newsletter = new Newsletter({ email });
    await newsletter.save();
    
    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to newsletter.", error: error.message });
  }
};
