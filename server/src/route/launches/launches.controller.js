const {
    getLaunches,
    addLaunch,
    abortLaunch
} = require('../../models/launches.model');

function httpGetLaunches(req, res) {
    return res.status(200).json(getLaunches());
}
function httpAddLaunch(req, res) {
    const isLaunchSuccess = addLaunch(req.body);
    console.log("before is launchsuccess" , isLaunchSuccess);
    if (isLaunchSuccess) {
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
