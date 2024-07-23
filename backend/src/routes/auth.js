const express = require("express");
const { signup, login, googleSignup, googleLogin } = require("../controllers/authController");

const router = express.Router();

// Signup Route
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Google Routes
router.post("/googleSignup", googleSignup);
router.post("/googleLogin", googleLogin);

module.exports = router;
