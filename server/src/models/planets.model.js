const {parse} = require('csv-parse');
const fs = require('fs');
const path = require('path');


function isHabitable(planet){
	return planet.koi_disposition === "CONFIRMED" &&
	planet.koi_insol > 0.36 && planet.koi_insol < 1.11 &&
	planet.koi_prad < 1.6;
}
function getPlanetsList(){
const habitablePlanets = [];
const promise = new Promise(async (resolve, reject)=>{
await fs.FileReadStream(path.join(
__dirname, "..", "..", "data", "kepler_data.csv"))
.pipe(parse({delimiter: ',',comment: "#", columns: true})).
on('data', (data)=>{
	if(isHabitable(data))
		habitablePlanets.push(data);
}).on('error', (err)=>reject(err)).
on('end', ()=>{
resolve(habitablePlanets);
})
})
return promise;
}

module.exports = getPlanetsList;