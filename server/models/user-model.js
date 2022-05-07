const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			min: 4,
			max: 20,
		},
		password: {
			type: String,
			required: true,
			min: 4,
			max: 20,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		all_fav_lid: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Location',
			},
		],
	},
	{ timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
