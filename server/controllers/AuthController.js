const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

// Register
exports.register = async (req, res, next) => {
	try {
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create user
		const newUser = new User({
			username: req.body.username,
			password: hashedPassword,
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

// Login
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
