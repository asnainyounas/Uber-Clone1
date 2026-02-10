const mongoose = require('mongoose');

function connectDB(){
    const uri = process.env.DB_CONNECT || process.env['DB-CONNECT'];
    if (!uri) {
        console.error('MongoDB URI not set. Define DB_CONNECT in .env or environment variables.');
        return Promise.reject(new Error('MongoDB URI not defined'));
    }

    return mongoose.connect(uri)
        .then(() => console.log('Database connected'))
        .catch((err) => { console.error('Database connection error:', err); throw err; });
}

module.exports = connectDB;