const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const userRoutes = require('./routes/users.routes');
const captainRoutes = require('./routes/captain.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {   
    res.send("hello")
})
app.use('/users', userRoutes);

app.use('/captains', captainRoutes);

module.exports = app;