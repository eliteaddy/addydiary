/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    names : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;