const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { address } = req.query;
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: 'Coordinates not found' });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { origin, destination } = req.query;

    const distanceTime = await mapService.getDistanceTime(origin, destination);

    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const useMockMaps = process.env.USE_MOCK_MAPS === 'true';

    if (useMockMaps) {
      const mockSuggestions = [
        `${input} Street`,
        `${input} Avenue`,
        `${input} Park`,
        `${input} Plaza`,
        `${input} Road`,
      ];

      return res.status(200).json(mockSuggestions);
    } else {
      // call Google Maps API
      const suggestions = await mapService.getAutoCompleteSuggestions(input);
      return res.status(200).json(suggestions);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
