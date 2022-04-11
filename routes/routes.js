const User = require('../models/users')
const express = require('express')
const app = express();



//Authorization
const verifyToken = require('../Authorization/auth')

//router
const router = require('express').Router();

const {register, login, getUser, deleteUser, updateUser} = require('../controllers/user')

router.post('/register', register);
router.post('/login', login);
router.get('/get/:id', verifyToken, getUser)
router.patch('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

module.exports = router;

