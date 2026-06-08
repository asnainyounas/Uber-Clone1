const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,  
        trim: true
    },
   
    otpHash: {
        type: String,
        required: [true, "OTP hash is required"]
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    },
    ownerId: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
},

ownerType: {
  type: String,
  enum: ['User', 'Captain'],
  required: true,
}
}, {
    timestamps: true
})

const otpModel = mongoose.model("otps", otpSchema)
module.exports = otpModel