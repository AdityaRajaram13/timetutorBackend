const express = require('express');
const jwt = require('jsonwebtoken');
const { Admin, Instructor } = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    const instructor = await Instructor.findOne({ username });

    let user;
    let role;

    if (admin) {
      user = admin;
      role = 'admin';
    } else if (instructor) {
      user = instructor;
      role = 'instructor';
    } else {
      console.log('Invalid username:', username); 
      return res.status(401).json({ status: 'failed', message: 'Invalid username' });
    }

    if (!user || user.password !== password) {
      console.log('Invalid username or password:', username); 
      return res.status(401).json({ status: 'failed', message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } 
    );
    console.log('Token generated:', token); 
    res.json({ status: 'success', message: 'Login successful', token, username: user.username, role });
  } catch (error) {
    console.error('Internal server error:', error); 
    res.status(500).json({ status: 'failed', message: 'Internal server error' });
  }
});

module.exports = router;
