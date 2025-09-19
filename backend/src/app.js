const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requests');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

app.get('/', (req,res) => res.send({ ok: true, message: 'Repair API' }));

module.exports = app;
