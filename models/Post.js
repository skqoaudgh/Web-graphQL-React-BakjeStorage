const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    },
    Path: {
        type: String,
        required: true
    },
    Tag: [{
        type: String,
        required: false
        }]
});

module.exports = mongoose.model('Post', postSchema);