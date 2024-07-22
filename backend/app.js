// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const cors = require('cors');

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(`Welcome to Mosaic Vision Backend! Version 16.8`);
  });
  
// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose.connect("mongodb+srv://mosaicvision52:lHiKhpK9JKnHHmM7@cluster0.3goxkbk.mongodb.net/ExtraCropSage?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
