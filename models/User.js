const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Nickname: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);