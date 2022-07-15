const mongoose = require("mongoose");
const SChema = mongoose.Schema;

const UserSchema = new SChema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    // enum: ["user", "admin", "moderator"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  color: {
    type: String,
    default: "gray",
  },
});

module.exports = mongoose.model("users", UserSchema);
