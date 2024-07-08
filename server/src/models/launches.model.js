const launchesDB = require("./launches.mongo");
const axios = require("axios")
const planets = require("./planets.mongo");
const FlightNumberStartCount = 0;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query"

async function saveLaunch(launch) {
    await launchesDB.updateOne({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
}

async function populateLaunches() {
    console.log("Downloading launch data...");
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });
    if (response.status !== 200) {
        console.log("Failed to download launch data");
        throw new Error("Failed to download launch data");
    }
    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc["payloads"];
        const customers = payloads.flatMap((payload) => {
            return payload["customers"];
        });
        const launch = {
            flightNumber: launchDoc["flight_number"],
            mission: launchDoc["name"],
            rocket: launchDoc["rocket"]["name"],
            launchDate: launchDoc["date_local"],
            upcoming: launchDoc["upcoming"],
            success: launchDoc["success"],
            customers
        };
        await saveLaunch(launch);
    }
}

async function loadSpacexLaunches() {
    const firstLaunch = await launchesDB.findOne({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat"
    });
    if (firstLaunch) {
        console.log("Launch data already loaded");
    } else {
        await populateLaunches();
    }
}

async function getLastFlightNumber() {
    const lastFlightNumber = await launchesDB.findOne().sort('-flightNumber');
    return lastFlightNumber ? lastFlightNumber.flightNumber : FlightNumberStartCount;
}

async function getLaunches(limit, skip) {
    const launches = await launchesDB.find({}, {"__v": 0, "_id": 0})
    .sort({flightNumber: 1}).skip(skip).limit(limit);
    return launches;
}
async function addLaunch(launch) {
    const planet = await planets.findOne({
        kepler_name: launch.target
    });
    if (launch.mission && launch.rocket && isNaN(launch.launchDate) && launch.target == planet.kepler_name ) {
        const newLaunch = Object.assign(launch, {
            flightNumber: await getLastFlightNumber() + 1,
            launchDate: new Date(launch.launchDate),
            customers: ['NASA'],
            upcoming: true,
            success: true,
        })
        await saveLaunch(newLaunch);
        console.log("New launch added: ", newLaunch)
        return newLaunch;
    } else {
        console.log("Error: Invalid launch data");
        return null;
    }
}
async function abortLaunch(id) {
    const aborted = await launchesDB.updateOne({
        flightNumber: id,
      }, {
        upcoming: false,
        success: false,
      });
    
      return aborted.modifiedCount === 1;
}
module.exports = {
    loadSpacexLaunches,
    getLaunches,
    addLaunch,
    abortLaunch
};
