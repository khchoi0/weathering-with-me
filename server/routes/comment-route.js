const express = require('express');
const router = express.Router();
const { commentCreate, commentRead } = require('../controllers/comment-controller');

router.post('/comment/create', commentCreate);

router.get('/comment/read', commentRead);

module.exports = router;