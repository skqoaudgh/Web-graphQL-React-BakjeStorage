const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    Path: {
        type: String,
        required: true
    },
    Post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }
});

module.exports = mongoose.model('Image',imageSchema);