const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');
const planets = require('./planets.mongo');

function isHabitable(planet){
	return planet.koi_disposition === "CONFIRMED" &&
	planet.koi_insol > 0.36 && planet.koi_insol < 1.11 &&
	planet.koi_prad < 1.6;
}
function loadPlanets(){
const promise = new Promise(async (resolve, reject)=>{
await fs.FileReadStream(path.join(
__dirname, "..", "..", "data", "kepler_data.csv"))
.pipe(parse({delimiter: ',',comment: "#", columns: true})).
on('data', async (data)=>{
	if(isHabitable(data)){
		await planets.updateOne({kepler_name: data.kepler_name},
								{kepler_name: data.kepler_name},
								{upsert: true})}
}).on('error', (err)=>reject(err)).
on('end', ()=>{
resolve(planets.find({}, {"__v": 0, "_id": 0}));
})
})
return promise;
}
module.exports = loadPlanets;
