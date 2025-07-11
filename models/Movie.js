const mongoose = require('mongoose');
const commentSchema = require('./Comment'); // Importing the external Comment schema

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    year: {
        type: Number,
        required: [true, 'Year is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    comments: [commentSchema] // Embedded array of comments
},);

module.exports = mongoose.model('Movie', movieSchema);
