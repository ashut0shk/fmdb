const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require("../config/config");

const simple = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.flags.token);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(config.responseCode.unauthorized).send({ error: config.message.unauthorized });
  }
};

const enhance = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, config.flags.token);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user || user.role !== 'developer') throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(config.responseCode.unauthorized).send({ error: config.message.unauthorized });
  }
};

module.exports = { simple, enhance };
