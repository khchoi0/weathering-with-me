const User = require('../models/user-model');

/**
 * Add cities to user's favorite list.
 *
 * @typedef requestBody
 * @property {String} username
 * @property {mongoose.Schema.Types.ObjectId} _id
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.addToFavList = async (req, res) => {
	try {
		// Add to favorite list without duplication
		let addFavQuery = await User.updateOne(
			{ username: req.body.username },
			{ $addToSet: { all_fav_lid: req.body._id } },
		);
		if (!addFavQuery) {
			return res.status(404).json({ message: 'Cannot add to favorite list! ' });
		}
		// Add to favorite list succeeded
		let user = await User.findOne(
			{ username: req.body.username },
			'username all_fav_lid',
		).populate('all_fav_lid');
		if (user === null) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user.all_fav_lid);
	} catch (error) {
		return res.status(500).json(error);
	}
};

/**
 * Remove cities from user's favorite list.
 *
 * @typedef requestBody
 * @property {String} username
 * @property {mongoose.Schema.Types.ObjectId} _id
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.removeFromFavList = async (req, res) => {
	try {
		// Remove from favorite list
		let removeFavQuery = await User.updateOne(
			{ username: req.body.username },
			{ $pull: { all_fav_lid: req.body._id } },
		).populate('all_fav_lid');
		if (!removeFavQuery) {
			return res.status(404).json({ message: 'Cannot remove from favorite list!' });
		}
		let user = await User.findOne(
			{ username: req.body.username },
			'username all_fav_lid',
		).populate('all_fav_lid');
		if (user === null) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json(user.all_fav_id);
	} catch (error) {
		return res.status(500).json(error);
	}
};

/**
 * Read cities from user's favorite list.
 *
 * @typedef requestBody
 * @property {String} uid
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.readFavList = async (req, res) => {
	try {
		const favLists = await User.findOne({ _id: req.params.uid }, 'all_fav_lid').populate(
			'all_fav_lid',
		);
		res.status(200).json(favLists.all_fav_lid);
	} catch (error) {
		return res.status(500).json(error);
	}
};
