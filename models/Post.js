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
    Image: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);