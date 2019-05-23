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
    Filepath: {
        type: String,
        required: true
    },
    Filename: {
        type: String,
        required: true
    },
    Filetype: {
        type: String,
        required: true
    },
    Filesize: {
        type: Number,
        required: true
    },    
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);