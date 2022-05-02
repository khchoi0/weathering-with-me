const express = require('express');
const router = express.Router();
const { createLoc, readLoc, updateLoc, deleteLoc } = require('../controllers/LocationController');

router.post('/loc/create', createLoc);

router.get('/loc/read', readLoc);

router.put('/loc/update', updateLoc);

router.delete('/loc/delete', deleteLoc);

module.exports = router;
