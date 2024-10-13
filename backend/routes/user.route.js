const express = require('express');
const { createAccount, login, getUser, logout, checkAuth } = require('../controllers/user.controller');
const { jwtAuthMiddleware } = require('../jwt');
const router = express.Router();

router.get('/check-auth', jwtAuthMiddleware, checkAuth);
router.post("/create-account", createAccount)
router.post("/login", login)
router.get("/logout", jwtAuthMiddleware, logout)
router.get("/get-user", jwtAuthMiddleware, getUser)

module.exports = router;