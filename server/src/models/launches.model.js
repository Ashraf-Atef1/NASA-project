const launches = new Map();
let lastFlightNumber = 100;
const launch = {
    flightNumber: 100,
    mission: 'Kepler X',
    rocket: 'Explorer IS1',
    launchDate: new Date('October 1, 2024'),
    target: 'Kepler-442 b',
    customer: ['NASA'],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);
function getLaunches() {
    return [...launches.values()];
}
function addLaunch(launch) {
    if (launch.mission && launch.rocket && isNaN(launch.launchDate) && launch.target) {
        const newLaunch = Object.assign(launch, {
            flightNumber: ++lastFlightNumber,
            launchDate: new Date(launch.launchDate),
            customer: ['NASA'],
            upcoming: true,
            success: true,
        })
        console.log(launch);
        launches.set(newLaunch.flightNumber, newLaunch);
        console.log("New launch added: ", newLaunch)
        return newLaunch;
    } else {
        console.log("Error: Invalid launch data");
        return null;
    }
}
function abortLaunch(id) {
    const aborted = launches.get(id);
    if (aborted) {
        aborted.upcoming = false;
        aborted.success = false;
        return aborted;
    } else {
        return null;
    }
}
module.exports = {
    getLaunches,
    addLaunch,
    abortLaunch
};
