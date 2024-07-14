const express = require('express');
const habitablePlanets = require('./planets/planets.router');
const launchesRouter = require('./launches/launches.router');
const api = express.Router();

api.use('/v1/planets', habitablePlanets);
api.use('/v1/launches', launchesRouter);
module.exports = api;