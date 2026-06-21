const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User is required'],
      refPath: 'userType',
    },

    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: ['User', 'Captain'],
    },

    ip: {
      type: String,
      required: [true, 'IP is required'],
    },
    userAgent: {
      type: String,
      required: [true, 'User agent is required'],
    },

    refreshTokenHash: {
      type: String,
      required: [true, 'Refresh token hash is required'],
    },

    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model('Session', sessionSchema);

module.exports = sessionModel;