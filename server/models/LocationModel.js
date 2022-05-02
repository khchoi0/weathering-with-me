const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema(
    {
        lname: {
            type: String,
            required: true,
            unique: true
        },
        lat: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        },
        long: {
            type: Number,
            required: true,
            min: -90,
            max: 90
        }
    },
);

module.exports = mongoose.model('Location', LocationSchema);
