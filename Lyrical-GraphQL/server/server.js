const express = require('express');
const models = require('./models');
const { graphqlHTTP: expressGraphQL } = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI = '';

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .once('open', () => console.log('Connected to Mongo Atlas instance.'))
    .on('error', error => console.log('Error connecting to Mongo Atlas:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
