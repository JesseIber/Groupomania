const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: { type: String, unique: true },
    password: { type: String },
    admin: { type: Number, default: 0 }
})

module.exports = { User }