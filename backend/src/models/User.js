const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Make password optional
  googleId: { type: String, unique: true, sparse: true }, // Ensure googleId is unique and sparse
  image: { type: String } // Optional field for user's profile image
});

module.exports = mongoose.model("User", UserSchema);
