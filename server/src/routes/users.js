const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const Movie = require('../models/movie');

const router = new express.Router();

// Create a user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(config.sendStatus.created).send({ user, token });
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});

// Login User
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(config.sendStatus.unauthorized).send({
      error: { message: config.message.passwordError },
    });
  }
});

// Logout user
router.post('/users/logout', auth.simple, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({});
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});

// Get favorites for a user
router.get('/users/favorites', auth.enhance, async (req, res) => {
  try {
    const genres = req.user.favoriteGenre || [];
    if (!genres) return res.sendStatus(config.sendStatus.lost);
    const favorites = await Movie.find({ genre: { "$in": genres }});
    if (favorites.length)
      res.status(config.sendStatus.created).send(favorites);
    else
      res.sendStatus(config.sendStatus.empty);
  } catch (e) {
    res.sendStatus(config.sendStatus.bad);
  }
});

// Modify user's favorites
router.patch('/users/me', auth.simple, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['favoriteGenre']; //Can be scaled
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) return res.status(config.sendStatus.bad).send({ error: config.message.invalidAction });

  try {
    const { user } = req;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(config.sendStatus.bad).send(e);
  }
});

module.exports = router;
