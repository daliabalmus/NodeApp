const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  sentInvitations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  connectionRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
