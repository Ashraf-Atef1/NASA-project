const express = require('express');
const httpGetPlantes = require('./planets.controller');
const planetsRouter = express.Router();

planetsRouter.get("/planets", (req, res)=>{
	httpGetPlantes(req, res);
});

module.exports = planetsRouter;