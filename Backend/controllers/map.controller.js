const mapService = require('../services/map.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { source, destination } = req.query;
        const distanceTime = await mapService.getDistanceTime(source, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: 'Coordinates not found' });
    }
}