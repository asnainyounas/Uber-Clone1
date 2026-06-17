const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const rideController = require('../controllers/ride.controller');

router.post(
  '/create',
  authMiddleware.authUser,
  body('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid pickup address'),
  body('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Invalid destination address'),
  body('vehicleType')
    .isString()
    .isIn(['auto', 'bike', 'car'])
    .withMessage('Invalid vehicleType'),
  rideController.createRide
);

router.get(
  '/get-fare',
  authMiddleware.authUser,
  query('pickup')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Pickup address required'),
  query('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Destination address required'),
  rideController.getFare
);

router.post(
  '/confirm',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride ID'),
  rideController.confirmRide
);

router.get(
  '/start-ride',
  authMiddleware.authCaptain,
  query('rideId').isMongoId().withMessage('Invalid ride ID'),
  query('otp')
    .isString()
    .isLength({ min: 4, max: 6 })
    .withMessage('Invalid OTP'),
  rideController.startRide
);

router.post(
  '/end-ride',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride ID'),
  rideController.endRide
);

module.exports = router;
