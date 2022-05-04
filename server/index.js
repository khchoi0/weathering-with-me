const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

// Port
const PORT = process.env.PORT;
// Database
const DATABASE = process.env.MONGO_URL;
// Prefix
const PREFIX = '/api';

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const authRoutes = require('./routes/auth-route');
const locRoutes = require('./routes/location-route');

// Use routes
app.use(PREFIX, authRoutes);
app.use(PREFIX, locRoutes);

app.listen(8000, async () => {
	console.log(`Server is running on ${PORT}`);

	// Connect to database
	try {
		await mongoose.connect(DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB!');
	} catch (error) {
		console.log(error);
	}
});
