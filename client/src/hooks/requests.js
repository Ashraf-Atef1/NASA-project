const API_URL = "v1"

// Load planets and return as JSON.
async function httpGetPlanets() {
  const Planets = (await fetch(`${API_URL}/planets`))
  return Planets.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const Launches = (await fetch(`${API_URL}/launches`))
  return Launches.json();
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const request = (await fetch(`${API_URL}/launches`, {
      method: "post",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(launch),
    }))
    return request;
  } catch {
    return { ok: false };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const request = (await fetch(`${API_URL}/launches/${id}`, { method: "delete" }))
    return request;
  } catch {
    return { ok: false };
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
