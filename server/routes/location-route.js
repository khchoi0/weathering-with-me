const express = require('express');
const router = express.Router();
const { locCreate, locRead, locUpdate, locDelete } = require('../controllers/location-controller');

router.post('/loc/create', locCreate);

router.get('/loc/read', locRead);

router.put('/loc/update', locUpdate);

router.delete('/loc/delete/:lname', locDelete);

module.exports = router;
