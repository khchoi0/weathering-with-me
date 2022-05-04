const express = require('express');
const router = express.Router();
const { register, login, userRead, userUpdate, userDelete } = require('../controllers/auth-controller');

router.post('/auth/register', register);

router.post('/auth/login', login);

router.post('/auth/read', userRead);

router.put('/auth/update', userUpdate);

router.delete('/auth/delete', userDelete);

module.exports = router;
