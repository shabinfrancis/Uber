const { validationResult } = require('express-validator');
const rideService = require('../services/ride.service');
const rideModel = require('../models/ride.model');

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, drop } = req.query;
    try {
        const fare = await rideService.getFare(pickup, drop);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}