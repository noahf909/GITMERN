const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/Customer'); // Adjust the path to your Customer model
require('dotenv').config();

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,           // Your gemail
        pass: process.env.EMAIL_PASSWORD, // Your App Password
    },
    //logger: true, // Enable detailed logging
    //debug: true,  // Enable debugging output
    tls: {
        ciphers: 'SSLv3', // Allow self-signed certificates (optional, for debugging)
    },
});

// Send Forgot Password Email
const sendForgotPasswordEmail = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        // Generate a JWT reset token
        const resetToken = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET,             // Secret key
            { expiresIn: '1h' }                 // Token expiry
        );

        // Email content; update with website url
        const emailContent = `
            <h1>Password Reset Request</h1>
            <p>Click the link below to reset your password:</p>
            <a href="http://www.aab.run/reset-password/${resetToken}">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
        `;

        // Send email
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Request',
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification email sent' });
    } catch (error) {
        console.error('Error in sendForgotPasswordEmail:', error.message);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in resetPassword:', error.message);
        if (error.name === 'TokenExpiredError') {
            res.status(400).json({ message: 'Reset token has expired' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = { sendForgotPasswordEmail, resetPassword };
