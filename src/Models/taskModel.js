const mongoose = require("mongoose")

const taskData = mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
      },
      description:{
          type: String,
          require: true,
          trim: true
      },
      panding:{
        type: String,
        require: true,
        enum: ["yes", "No"]
      },
      completed:{
        type: String,
        require: true,
        enum: ["yes", "No"]
      }

},{timestamps: true })

module.exports = mongoose.module("task",taskData)