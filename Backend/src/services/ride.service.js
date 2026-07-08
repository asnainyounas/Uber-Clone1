const rideModel = require('../Models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../../socket');

module.exports.getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error('Pickup and destination are required');
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);

  const distanceInKm = distanceTime.distance.value / 1000;
  const durationInMin = distanceTime.duration.value / 60;

  const fares = {
    bike: Math.round(20 + distanceInKm * 5 + durationInMin * 1),
    auto: Math.round(30 + distanceInKm * 8 + durationInMin * 1.5),
    car: Math.round(50 + distanceInKm * 12 + durationInMin * 2),
  };

  return {
    fares,
    duration: distanceTime.duration.text || '3 min',
  };
};

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const fareData = await module.exports.getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fareData.fares[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride ID is required');
  }

  await rideModel.findByIdAndUpdate(
    { _id: rideId },
    {
      status: 'completed',
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findById({ _id: rideId })
    .populate('user', 'name email')
    .populate('captain', 'fullname vehicle')
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  sendMessageToSocketId(user.socketId, 'confirm-ride', ride);

  return ride;
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error('Ride ID and OTP are required');
  }

  const ride = await rideModel
    .findOne({ _id: rideId, otp })
    .populate('user', 'name email')
    .populate('captain', 'fullname vehicle')
    .select('+otp');
  if (!ride) {
    throw new Error('Ride not found or invalid OTP');
  }

  if (ride.status !== 'accepted') {
    throw new Error('Ride is not accepted');
  }

  if (ride.otp !== otp) {
    throw new Error('Invalid OTP');
  }

  await rideModel.findByIdAndUpdate(ride._id, { status: 'ongoing' });

  sendMessageToSocketId(user.socketId, 'ride-started', ride);

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error('Ride ID is required');
  }

  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate('user')
    .populate('captain')
    .select('+otp');

  if (!ride) {
    throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
    throw new Error('Ride is not ongoing');
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId, captain: captain._id },
    { status: 'completed' }
  );

  sendMessageToSocketId(ride.user.socketId, {
    event: 'ride-completed',
    data: ride,
  });

  return ride;
};
