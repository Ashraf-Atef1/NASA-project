const http = require("http");
const PORT = process.env.PORT || 8000;
const app = require("./app");
const mongooseConnect = require("./services/mongo")
const server = http.createServer(app);
const loadPlanets = require("./models/planets.model")
const {loadSpacexLaunches} = require("./models/launches.model")

server.listen(PORT, async ()=>{
	await mongooseConnect();
	const planets = await loadPlanets();
	loadSpacexLaunches();
	console.log(`Total planets: ${planets.length}`)
	console.log("Server is running " + PORT);
})