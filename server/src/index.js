const express = require('express');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '../.env') });
}

require('./db/mongoose');

// Routes
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const app = express();
app.disable('x-powered-by');
const port = process.env.PORT || 8080;

// Serve static files from the frontEnd app
app.use(express.static(path.join(__dirname, '../../client/build')));

app.use(function(req, res, next) {
  // Websites allowed to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods allowed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers allowed
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization'
  );

  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(userRouter);
app.use(movieRouter);

// The "catchall" handler: unhadled requests to send back FrontEnd's index.html file.
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});

app.listen(port, () => console.log(`app is running in PORT: ${port}`));
