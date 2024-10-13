const express = require('express');
const { createAccount, login, getUser, logout } = require('../controllers/user.controller');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

router.post("/create-account", createAccount)
router.post("/login", login)
router.get("/logout", jwtAuthMiddleware, logout)
router.get("/get-user", jwtAuthMiddleware, getUser)

module.exports = router;