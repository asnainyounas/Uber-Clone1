const { Router } = require('express');

const captainRouter = Router();

const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Auth
captainRouter.post('/register', captainController.registerCaptain);

captainRouter.post('/login', captainController.loginCaptain);

captainRouter.post('/verify-email', captainController.verifyCaptainEmail);

captainRouter.post('/resend-otp', captainController.resendCaptainOtp);

// Profile
captainRouter.get(
  '/profile',
  authMiddleware.authCaptain,
  captainController.getCaptainProfile
);

// Session
captainRouter.get(
  '/logout',
  authMiddleware.authCaptain,
  captainController.logoutCaptain
);

module.exports = captainRouter;