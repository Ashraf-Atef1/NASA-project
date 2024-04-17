const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const habitablePlanets = require('./route/planets/planets.router');
const launchesRouter = require('./route/launches/launches.router')
app.use(morgan('combined'));
app.use(cors({
	origin: "http://localhost:3000"
}))
app.use(express.json());
app.use('/planets', habitablePlanets);
app.use('/launches', launchesRouter);
app.use(express.static(path.join(__dirname, "..", "public")));
app.get('/*', (req, res)=>{
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
})
module.exports = app;
