const mongoose = require("mongoose");

const usersData = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"]
  },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      unique: true,
      require:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", usersData);
