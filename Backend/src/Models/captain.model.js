const mongoose = require('mongoose');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      minlength: 3,
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  refreshToken: {
    type: String,
  },

  verified: {
    type: Boolean,
    default: false,
  },

  socketId: String,

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive',
  },

  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ['car', 'motorcycle', 'auto'],
      required: true,
    },
  },

  location: {
    ltd: Number,
    lng: Number,
  },
});



module.exports = mongoose.model('Captain', captainSchema);