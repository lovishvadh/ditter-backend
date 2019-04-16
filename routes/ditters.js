const router = require('express').Router()
const responseBuilder = require('../modules/responseBuilder');
const ditterModule = require('../modules/ditter');
const userModule = require('../modules/user');
const authenticated = require('../authentication');

router.post('/add', authenticated, addNewDitter);
router.get('/feed', authenticated, getUserFeed);
router.get('/feed/:username', authenticated, getUserDitters);

async function addNewDitter(req, res) {
    try {
        responseBuilder.sendResponse(
            200,
            await ditterModule.addNewDitter(req.username, req.body.ditterText),
            req,
            res, {}, {},
            "Add new ditter"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function getUserFeed(req, res) {
    try {
        let usernameArray = await userModule.getFollowing(req.username);
        usernameArray.push(req.username);
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            await ditterModule.getDitterFeed(usernameArray), {},
            "User Feed"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function getUserDitters(req, res) {
    try {
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            await ditterModule.getSingleUserDitter(req.params.username), {},
            "Get user ditters"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

module.exports = router