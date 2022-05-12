const express = require('express');
const router = express.Router();
const { commentCreate, commentRead } = require('../controllers/comment-controller');

router.post('/comment/create', commentCreate);

router.get('/comment/read/:lid', commentRead);

module.exports = router;