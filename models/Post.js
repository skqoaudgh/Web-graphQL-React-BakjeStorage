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
    Tag: [{
        type: String,
        required: false
    }], 
    Filedata: {
        type: String,
        required: true
    },
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);