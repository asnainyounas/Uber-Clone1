const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('fullname.firstname')
      .isLength({ min: 3 })
      .withMessage('First name must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

router.get('/profile', authMiddleware.authUser, authController.getUserProfile);

router.get('/logout', authMiddleware.authUser, authController.logout);

router.get('/get-me', authController.getMe);

router.get('/refresh-token', authController.RefreshToken);

router.post('/logout-all', authController.logoutAll);

router.post('/verify-email', authController.verifyEmail);

router.post('/resend-otp', authController.resendOtp);

module.exports = router;
