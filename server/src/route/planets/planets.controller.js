const getPlantes = require('../../models/planets.model');

async function httpGetPlantes(req, res){
	const planets = await getPlantes();
	return res.status(200).json(planets);
}

module.exports = httpGetPlantes;
