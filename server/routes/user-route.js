const express = require('express');
const router = express.Router();
const { addToFavList, removeFromFavList, readFavList } = require('../controllers/user-controller');

router.post('/user/addFav', addToFavList);

router.post('/user/removeFav', removeFromFavList);

router.get('/user/readFav/:uid', readFavList);

module.exports = router;
