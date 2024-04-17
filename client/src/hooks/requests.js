async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const Planets = (await fetch("http://localhost:8000/planets"))
  return Planets.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const Launches = (await fetch("http://localhost:8000/launches"))
  return Launches.json();
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const request = (await fetch("http://localhost:8000/launches", {
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
    const request = (await fetch(`http://localhost:8000/launches/${id}`, { method: "delete" }))
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
