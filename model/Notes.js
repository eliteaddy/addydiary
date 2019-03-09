/**
 * @author: Adesile Isaiah Ayomide
 * aka: MasterAddy
 * Portfolio: https://eliteaddy.github.io
 */

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    content : {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;