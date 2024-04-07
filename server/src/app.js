const express = require('express');
const cors = require('cors');
const app = express();
const habitablePlanets = require('./route/planets/planets.router');
app.use(cors({
	origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(habitablePlanets);
module.exports = app;
