const router = require('express').Router()
const responseBuilder = require('../modules/responseBuilder');
const userModule = require('../modules/user');
const jwt = require('../modules/jwt');
const validators = require('../validators/user');
const authenticated = require('../authentication');

router.post('/signup', signUpUser);
router.post('/login', loginUser);
router.post('/follow', authenticated, follow);
router.post('/unfollow', authenticated, unfollow);
router.get('/data/:username', authenticated, getUser);
router.get('/data', authenticated, getUser);
router.post('/search', authenticated, searchUser);
router.get('/all', authenticated, getAllUsers);

async function signUpUser(req, res) {
    try {
        let validationErrors = [];
        validationErrors = await validators.validateSignUpData(req.body);
        if (validationErrors.length) {
            responseBuilder.sendValidationErrorsResponse(validationErrors, req, res);
        } else {
            responseBuilder.sendResponse(
                200,
                await userModule.signUpUser(req.body),
                req,
                res, {}, {},
                "SignUp response"
            );
        }
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function loginUser(req, res) {
    try {
        let validationErrors = [];
        validationErrors = await validators.validateLoginData(req.body);

        if (validationErrors.length) {
            responseBuilder.sendValidationErrorsResponse(validationErrors, req, res);
        } else {
            responseBuilder.sendResponse(
                200,
                true,
                req,
                res, {
                    token: await jwt.sign({
                        username: req.body.username
                    })
                }, {},
                "Login response"
            );
        }
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}


async function follow(req, res) {
    try {
        let validationErrors = [];
        validationErrors = await validators.validateFollowRequest(req.username, req.body.userToFollow);

        if (validationErrors.length) {
            responseBuilder.sendValidationErrorsResponse(validationErrors, req, res);
        } else {
            responseBuilder.sendResponse(
                200,
                await userModule.follow(req.username, req.body.userToFollow),
                req,
                res, {}, {},
                "Follow user"
            );
        }
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function unfollow(req, res) {
    try {
        let validationErrors = [];

        validationErrors = await validators.validateUnfollowRequest(req.username, req.body.userToUnfollow);

        if (validationErrors.length) {
            responseBuilder.sendValidationErrorsResponse(validationErrors, req, res);
        } else {
            responseBuilder.sendResponse(
                200,
                await userModule.unfollow(req.username, req.body.userToUnfollow),
                req,
                res, {}, {},
                "Unfollow user"
            );
        }
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function getUser(req, res) {
    try {
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            await userModule.searchUser(req.params.username || req.username), {},
            "User Info"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function searchUser(req, res) {
    try {
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            await userModule.searchUser(req.body.searchQuery), {},
            "User Info"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

async function getAllUsers(req, res) {
    try {
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            await userModule.getAllUsers(), {},
            "All users"
        );
    } catch (err) {
        responseBuilder.sendInternalServerError(req, res);
        console.log(err);
        throw err;
    }
}

module.exports = router