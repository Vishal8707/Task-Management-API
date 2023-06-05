const mongoose = require("mongoose")

const usersData = mongoose.Schema({

},{ timestamps: true })


module.exports = mongoose.model('User', usersData)