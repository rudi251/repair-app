const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

router.post('/register', async (req,res) => {
  try {
    const { email, password, fullName, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already used' });
    const user = new User({ email, password, fullName, role });
    await user.save();
    res.json({ message: 'Registered' });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req,res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ accessToken: token, user: { id: user._id, email: user.email, fullName: user.fullName, role: user.role } });
  } catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
