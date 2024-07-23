const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  try {
    let user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.googleSignup = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub } = ticket.getPayload();

    console.log('Google Signup Payload:', { name, email, picture, sub });

    let user = await User.findOne({ googleId: sub });

    if (user) {
      console.log('User already exists with Google ID:', sub);
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      googleId: sub,
      username: name,
      email: email,
      image: picture,
    });

    await user.save();

    console.log('New user signed up with Google:', user);

    res.status(200).json({ message: 'User signed up successfully', user });
  } catch (error) {
    console.error('Google signup error:', error);
    res.status(500).json({ message: 'Google signup failed', error: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, sub } = ticket.getPayload();
    console.log('Google Login Payload:', { email, sub });

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      console.log('User not found with Google ID:', sub);
      return res.status(404).json({ message: 'User not found. Please sign up.' });
    }

    console.log('User found and logged in with Google:', user);

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Google login failed', error: error.message });
  }
};
