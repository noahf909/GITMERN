const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Customer'); // Replace with your user model
//const bcrypt = require('bcryptjs');
const router = express.Router();
const { sendForgotPasswordEmail, emailVerification, verifyEmail } = require('../controllers/authController'); 

//endpoint for sending the verification email
router.post('/email-verification', emailVerification);

//endpoint for verifying user and registering the user
router.post('/verify-email/:token', verifyEmail);

// Forgot Password Route
router.post('/forgot-password', sendForgotPasswordEmail);

// Password reset route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password and save it
        //const hashedPassword = await bcrypt.hash(newPassword, 10);
        //user.password = hashedPassword;
        
        user.password = newPassword; //for dev purposes
        await user.save();

        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

// Validate Reset Token (Optional Validation)
router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    try {
        // Verify the reset token
        jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Valid token' });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});

module.exports = router;
