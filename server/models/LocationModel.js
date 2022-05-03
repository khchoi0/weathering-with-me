const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
	lname: {
		type: String,
		required: true,
		unique: true,
	},
	lat: {
		type: Number,
		required: true,
	},
	long: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model('Location', LocationSchema);
