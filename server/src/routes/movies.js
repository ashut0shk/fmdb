const express = require('express');
const auth = require('../middlewares/auth');
const Movie = require('../models/movie');
const config = require("../config/config");
const router = new express.Router();

// Create a movie
router.post('/movies', auth.enhance, async (req, res) => {
  const movie = new Movie(req.body);
  try {
    await movie.save();
    res.status(config.sendStatus.created).send(movie);
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});



// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});

//(up/down)vote
router.put('/movies/vote/:id/:type', async (req, res) => {
  const voteType = req.params.type;
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.sendStatus(config.sendStatus.lost);
    movie.vote = (voteType === 'up') ? movie.vote + 1 : movie.vote - 1;
    await movie.save();
    res.send(movie);
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});

// Search or sort
router.get('/movies/search/:action', async (req, res) => {
  const action = req.params.action; //sort or not

  if (typeof req.query.title !== 'undefined') {
      sort = 'title';
      order = req.query.title;
  }
  if (typeof req.query.year !== 'undefined') {
      sort = 'year';
      order = req.query.year;
  }

  if (typeof req.query.votes !== 'undefined') {
      sort = 'votes';
      order = req.query.votes;
  }

  try {
    const movies = await Movie.find({ sort: { '$regex': order } });
    if (!movies.length) return res.sendStatus(config.sendStatus.lost);

    if (action == 'sort') {
      // Sort title
      if (sort == 'votes') {
        movies.sort(function (a, b) {
          return (a.votes < b.votes) ? -1 : (a.votes > b.votes) ? 1 : 0;
        });

        if (order == 'desc') {
          movies.reverse();
          order = 'asc';
        } else {
          order = 'desc';
        }
      }
      // Sort year
      if (sort == 'year') {
        filmsdata.sort(function (a, b) {
          return parseFloat(a.year) - parseFloat(b.year);
        });

        if (order == 'desc') {
          movies.reverse();
          order = 'asc';
        } else {
          order = 'desc';
        }
      }
    }
    return res.send(movies);
  } catch (e) {
    return res.status(config.sendStatus.bad).send(e);
  }
});

module.exports = router;
