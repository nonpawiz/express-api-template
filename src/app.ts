// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// module.exports = app;

import express from "express";
import router from "./routes";
import { notFoundHandler, errorHandler } from "./middleware/response";

const app = express();

// Middleware
app.use(express.json());
// Use Routes

app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
