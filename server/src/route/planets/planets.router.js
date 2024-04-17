const express = require('express');
const httpGetPlantes = require('./planets.controller');
const planetsRouter = express.Router();

planetsRouter.get("/", (req, res)=>{
	httpGetPlantes(req, res);
});

module.exports = planetsRouter;