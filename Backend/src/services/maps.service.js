const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status !== 'OK' || !response.data.results.length) {
      throw new Error('Invalid address or no results found');
    }

    const { lat, lng } = response.data.results[0].geometry.location;

    return { lat, lng };
  } catch (error) {
    console.error('Geocoding error:', error.message);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      throw new Error('Origin and destination are required');
    }

    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/distancematrix/json',
      {
        params: {
          origins: origin,
          destinations: destination,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    // ❌ if API fails → fallback
    if (
      !response ||
      response.data.status !== 'OK' ||
      !response.data.rows ||
      !response.data.rows[0] ||
      !response.data.rows[0].elements ||
      response.data.rows[0].elements[0].status !== 'OK'
    ) {
      console.warn('Google API failed, using mock data');

      return {
        distance: { text: '5 km', value: 5000 },
        duration: { text: '10 mins', value: 600 },
      };
    }

    const element = response.data.rows[0].elements[0];

    return {
      distance: element.distance,
      duration: element.duration,
    };
  } catch (error) {
    console.error('DistanceMatrix error:', error.message);

    // 🔥 fallback even on crash
    return {
      distance: { text: '5 km', value: 5000 },
      duration: { text: '10 mins', value: 600 },
    };
  }
};
module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error('query is required');
  }

  const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  const response = await axios.get(url, {
    params: {
      input,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  if (response.data.status !== 'OK') {
    throw new Error('Unable to fetch suggestions');
  }

  return response.data.predictions;
};

module.exports.getCaptainRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6378.1],
      },
    },
  });

  return captains;
};
