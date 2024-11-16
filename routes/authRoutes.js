const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/email');
const User = require('../models/User');
const { authMiddleware } = require('../utils/authMiddleware');
const router = express.Router();
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Render the registration page
router.get('/register', (req, res) => res.render('auth/register'));

// Handle user registration
router.post('/register', async (req, res) => {
  console.log('Register POST request received with data:', req.body);
  try {
    const { username, email, password, firstName, lastName, age, gender } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists.');
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      age,
      gender,
      twoFactorSecret: secret.base32,
      is2FAEnabled: true,
      role: 'editor',
    });

    await newUser.save();

    const otpauthURL = secret.otpauth_url;
    const dataUrl = await qrcode.toDataURL(otpauthURL);

    await sendEmail(email, 'Welcome to Portfolio Platform', 'Thank you for registering!');

    res.render('auth/2fa-setup', { qrCodeImage: dataUrl });
  } catch (error) {
    console.error('Error during registration:', error);

    if (error.code === 11000) {
      return res.status(400).send('Username or email already exists.');
    }

    res.status(500).send('Registration failed. Please try again.');
  }
});

// Render the login page
router.get('/login', (req, res) => res.render('auth/login'));

// Handle user login
router.post('/login', async (req, res) => {
  const { username, password, token } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  if (user.is2FAEnabled) {
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
    });
    if (!verified) {
      return res.status(401).send('Invalid 2FA token');
    }
  }

  req.session.user = { id: user._id, role: user.role };
  res.redirect('/');
});

// Handle user logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out.');
    }
    res.redirect('/auth/login');
  });
});

module.exports = router;
