const mongoose = require('mongoose');

const { Schema } = mongoose;
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  votes: {
    type: Number,
    default: 0,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
