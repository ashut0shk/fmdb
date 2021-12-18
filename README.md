<h1 align="center">
FMDB
</h1>
<p align="center">
MongoDB, Expressjs, Nodejs
</p>

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/express.svg)](https://badge.fury.io/js/express) [![npm version](https://badge.fury.io/js/nodejs.svg)](https://badge.fury.io/js/nodejs)

FMDB, is a free (as in freedom) movie database backend, subset of TMDB / IMDB or OMDB

  - Search Movies by Name or Genre
  - Sort search results by Release date or Votes
  - Add movies
  - Add movie reviews
  - Signup as a registered user


<img src="https://github.com/ashut0shk/fmdb/raw/main/assets/icons/main-icon.png" />


# Features!

  - Add Users
  - User Login
  - Add Movies
  - Add Favorits
  - Add Movie Reviews
  - Vote Movies
  - Get Movie Details
  - List Movies Recommendations
  - Search Movies
  - Sort Movies List



### Technologies
FMDB uses a number of open source projects to function properly:
* [MongoDB](https://www.mongodb.com/) - A document-oriented, destructured database used to store the application data.
* [ExpressJS](https://expressjs.com/) - Blazing node.js network app framework.
* [nodeJS](https://nodejs.org/) - A JavaScript runtime built on Chromium's V8

### Installation

FMDB requires [Node.js](https://nodejs.org/)  to run.

Set environment variables

```sh
$ Create a .env file in your backend server folder
$ See the .env sample
create a mongodb database and add your connection string into .env file
```

Install the dependencies and devDependencies

```sh
$ git clone https://github.com/ashut0shk/fmdb.git
$ npm install
$ cd server npm install && npm start
```
Start the server.

```sh
$ cd server
$ npm install
```

Start from root path
```sh
$ npm run server
```

### Server Plugins

FMDB is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| multer | [plugins/multer/README.md](https://github.com/expressjs/multer/blob/master/README.md)|
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |


License
----

[MIT](https://raw.githubusercontent.com/ashut0shk/fmdb/main/LICENSE)

Disclaimer
----
This project should not be confused with [SQlite framework](https://github.com/ccgus/fmdb) with the same name. There isn't any relation nor dependency.