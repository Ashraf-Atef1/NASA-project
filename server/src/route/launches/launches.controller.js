const {
    getLaunches,
    addLaunch,
    abortLaunch
} = require('../../models/launches.model');

function httpGetLaunches(req, res) {
    return res.status(200).json(getLaunches());
}
function httpAddLaunch(req, res) {
    if (addLaunch(req.body)) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
function httpAbortLaunch(req, res) {
    if (abortLaunch(+req.params.id)) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
module.exports = {httpGetLaunches, httpAddLaunch, httpAbortLaunch}
