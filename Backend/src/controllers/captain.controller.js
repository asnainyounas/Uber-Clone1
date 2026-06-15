const captainModel = require('../Models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const otpModel = require('../Models/otp.model');
const { sendEmail } = require('../services/email.service');
const { generateOtp, getOtpHtml } = require('../utils/utils');
const axios = require('axios');


// ---------------- REGISTER CAPTAIN ----------------
module.exports.registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const emailLower = email.toLowerCase().trim();

    const existingCaptain = await captainModel.findOne({ email: emailLower });

    if (existingCaptain) {
      return res.status(409).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email: emailLower,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await otpModel.create({
      email: emailLower,
      ownerId: captain._id,
      ownerType: "Captain",
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      emailLower,
      'Captain Email Verification',
      `Your OTP is ${otp}`,
      getOtpHtml(otp)
    );

    return res.status(201).json({
      message: 'Captain registered successfully',
      captain: {
        fullname: captain.fullname,
        email: captain.email,
      },
      verified: captain.verified,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- LOGIN CAPTAIN ----------------
module.exports.loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const emailLower = email.toLowerCase().trim();

    const captain = await captainModel
      .findOne({ email: emailLower })
      .select('+password');

    if (!captain) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!captain.verified) {
      return res.status(401).json({ message: 'Email not verified' });
    }

   
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    axios.post(
  "https://asnainyounas.app.n8n.cloud/webhook-test/User-login",
  {
    name: captain.fullname.firstname,
    email: captain.email,
    role: "captain"
  }
).catch(console.error);

    return res.status(200).json({ token, captain });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- GET PROFILE ----------------
module.exports.getCaptainProfile = async (req, res) => {
  return res.status(200).json({ captain: req.captain });
};

// ---------------- LOGOUT ----------------
module.exports.logoutCaptain = async (req, res) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- VERIFY OTP ----------------
module.exports.verifyCaptainEmail = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        message: 'OTP and email are required',
      });
    }

    const emailLower = email.toLowerCase().trim();

    const otpDoc = await otpModel
      .findOne({
        email: emailLower,
        ownerType: "Captain",
      })
      .sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (otpDoc.expiresAt < new Date()) {
      await otpModel.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const isMatch = await bcrypt.compare(otp.trim(), otpDoc.otpHash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const captain = await captainModel.findByIdAndUpdate(
      otpDoc.ownerId,
      { verified: true },
      { new: true }
    );

    await otpModel.deleteMany({
      ownerId: otpDoc.ownerId,
    });

    return res.status(200).json({
      message: 'Captain verified successfully',
      captain: {
        fullname: captain.fullname,
        email: captain.email,
        verified: captain.verified,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// ---------------- RESEND OTP ----------------
module.exports.resendCaptainOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const emailLower = email.toLowerCase().trim();

    const captain = await captainModel.findOne({ email: emailLower });

    if (!captain) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);

    await otpModel.deleteMany({
      email: emailLower,
      ownerType: "Captain",
    });

    await otpModel.create({
      email: emailLower,
      ownerId: captain._id,
      ownerType: "Captain",
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendEmail(
      emailLower,
      'Captain Verification OTP',
      `Your OTP is ${otp}`,
      getOtpHtml(otp)
    );

    return res.status(200).json({
      message: 'OTP resent successfully',
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};