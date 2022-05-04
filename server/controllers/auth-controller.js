const User = require('../models/user-model');
const bcrypt = require('bcrypt');


/**
 * Register by a user /create a user by admin
 * 
 * @typedef requestBody
 * @property {String} username
 * @property {String} password
 * @property {boolean} isAdmin
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.register = async (req, res, next) => {
	try {
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create user
		const newUser = new User({
			username: req.body.username,
			password: hashedPassword,
			isAdmin: req.body.isAdmin
		});

		// Save user into database
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		// User already exists - Mongoose built-in method
		if (error.message.includes('E11000')) {
			return res.status(409).json({ message: 'User already exists.' });
		}
		return res.status(500).json(error);
	}
};

/**
 * Login as a user or admin
 * 
 * @typedef requestBody
 * @property {String} username
 * @property {String} password
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		const verifyPassword = await bcrypt.compare(req.body.password, user.password);
		if (!verifyPassword) {
			return res.status(400).json({ message: 'Username or password is incorrect.' });
		}

		// Authentication succeeded
		res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
};

/**
 * Read all users only (not include admins)
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.userRead = async (req, res) => {
	try {
		const users = await User.find({ isAdmin: false }, 'username password');
		if (users === []) {
			return res.status(404).json({ message: 'No users in database' });
		}

		res.status(200).json(users);
	} catch (error) {
		return res.status(500).json(error);
	}
};


/**
 * Update a user's information
 * 
 * @typedef requestBody
 * @property {String} oldUsername
 * @property {String} newUsername
 * @property {String} password
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.userUpdate = async (req, res) => {
	try {
		let oldUsername = req.body.oldUsername;
		let newUsername = req.body.newUsername;

		// Find user
		let user = await User.findOne({ username: oldUsername }, 'username password');
		if (user === null) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check new username's availability
		if (oldUsername !== newUsername) {
			let newUser = await User.findOne({ username: newUsername })
			if (newUser !== null) {
				return res.status(405).json({ message: 'The username is occupied' });
			}
		}

		// Update user
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		user.username = newUsername;
		user.password = hashedPassword;
		user.save();

		res.status(200).json(user);
	} catch (error) {
		return res.status(500).json(error);
	}
}

/**
 * Delete a user
 * 
 * @typedef requestBody
 * @property {String} username
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
exports.userDelete = async (req, res) => {
	try {
		let delQuery = await User.deleteOne({ username: req.body.username, isAdmin: false });
		if (delQuery.deletedCount === 0) {
			return res.status(404).json({ message: 'User isnot found' });
		}

		res.status(200).json({ message: 'User is deleted' })
	} catch (err) {
		return res.status(500).json(err);
	}
}