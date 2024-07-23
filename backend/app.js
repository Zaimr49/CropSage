const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const cors = require('cors');
const passport = require("./src/auth/googleAuth");
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Configure session
app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using https
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send(`Welcome to Crop Sage Backend! `);
});

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
