const express = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Replace with your mongoLab URI
const db_uri = process.env.MONGO_URI;
if (!db_uri) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(db_uri);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = webpack(require('../webpack.config.js'));
app.use(webpackDevMiddleware(config));


module.exports = app;
