const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: { type: String, required: true, minlength: 3 },
    lastname: { type: String, minlength: 3 },
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

  refreshToken: String,

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
    color: { type: String, required: true },
    plate: { type: String, required: true },
    capacity: { type: Number, required: true },
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

captainSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return token;
};

module.exports =
  mongoose.models.Captain || mongoose.model('Captain', captainSchema);
