const {
    getLaunches,
    addLaunch,
    abortLaunch
} = require('../../models/launches.model');
const getPagination = require('../../services/query');

async function httpGetLaunches(req, res) {
    const {limit, skip} = await getPagination(req.query);
    return res.status(200).json(await getLaunches(limit, skip));
}
async function httpAddLaunch(req, res) {
    const isLaunchSuccess = await addLaunch(req.body);
    if (isLaunchSuccess) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
async function httpAbortLaunch(req, res) {
    if (await abortLaunch(+req.params.id)) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}
module.exports = {httpGetLaunches, httpAddLaunch, httpAbortLaunch}
