const express = require('express');
const route = express.Router();

const { loginAction, registerAction } = require("../controllers/auth-controller");

route.post('/login', loginAction);
// route.post('/regis', registerAction);

module.exports = route