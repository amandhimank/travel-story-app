const express = require('express');
const { createAccount, login, getUser } = require('../controllers/user.controller');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

router.post("/create-account", createAccount)

router.post("/login", login)

router.get("/get-user", jwtAuthMiddleware, getUser)

module.exports = router;