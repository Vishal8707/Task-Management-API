const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const taskData = mongoose.Schema(
  {
    UserId: {
      type: ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    panding: {
      type: String,
      enum: ["Yes", "No"],
    },
    completed: {
      type: String,
      enum: ["Yes", "No"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", taskData);
