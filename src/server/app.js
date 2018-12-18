require('express-async-errors');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const error = require('./middlewares/error');
const cors = require('cors');
require('./setup/passport');

const app = express();

app.use(express.static('dist'));

//to send static react app
app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname + '../../../dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(error);

module.exports = app;
