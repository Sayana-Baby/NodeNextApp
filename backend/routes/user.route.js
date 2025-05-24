
const express = require('express');
const userRouter = express.Router();

const auth = require('../controllers/user.controller');
userRouter.post('/register',auth.register);
userRouter.post('/login',auth.login);

module.exports = userRouter;
