const Location = require('../models/LocationModel')

/**
 * Create a location
 * 
 * @typedef {object} requestBody
 * @property {String} lname
 * @property {Number} lat
 * @property {Number} long
 * 
 * @param {import('express').Response} req
 * @param {import('express').Response} res    
 * @returns 
 */
exports.createLoc = async (req, res) => {
    try {
        const loc = new Location({
            lname: req.body.lname,
            lat: req.body.lat,
            long: req.body.long
        });
        const locRes = await loc.save();
        res.status(200).json(locRes);

    } catch (err) {
        // User already exists - Mongoose built-in method
        if (err.message.includes('E11000')) {
            return res.status(409).json({ message: 'Location already exists.' });
        }
        return res.status(500).json(err);
    }
};

/**
 * Read all locations
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
exports.readLoc = async (req, res) => {
    try {
        const loc = await Location.find();
        if (loc === []) {
            return res.status(404).json({ message: 'No locations in database' });
        }

        res.status(200).json(loc);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * Update a location
 * 
 * @typedef requestBody
 * @property {String} oldLname
 * @property {String} newLname
 * @property {Number} lat
 * @property {Number} long
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res 
 * @returns 
 */
exports.updateLoc = async (req, res) => {
    try {
        let loc = await Location.findOne({ lname: req.body.oldLname }, 'lname lat long');
        if (loc === null) {
            return res.status(404).json({ message: 'The location does not existed' });
        }

        if (req.body.oldLname !== req.body.newLname) { // check newLname is occupied
            let newloc = await Location.findOne({ lname: req.body.newLname }, 'lname lat long');
            if (newloc !== null) {
                return res.status(405).json({ message: 'The location name is occupied' });
            }
        }

        loc.lname = req.body.newLname;
        loc.lat = req.body.lat;
        loc.long = req.body.long;
        loc.save();

        res.status(200).json(loc);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Delete a location
 * 
 * @typedef requestBody
 * @property {String} lname
 * 
 * @param {request} req
 * @param {response} res 
 * @returns 
 */
exports.deleteLoc = async (req, res) => {
    try {
        let loc = await Location.deleteOne({ lname: req.body.lname });
        if (loc.deletedCount === 0) {
            return res.status(404).json({ message: 'The location does not existed' });
        }

        res.status(200).json(loc);
    } catch (error) {
        return res.status(500).json(error);
    }
}
