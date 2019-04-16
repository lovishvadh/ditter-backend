const router = require('express').Router()
const responseBuilder = require('../modules/responseBuilder');

router.get('/', apiInfo);

function apiInfo(req, res, next) {
    try {
        responseBuilder.sendResponse(
            200,
            true,
            req,
            res,
            {
                name: 'DITTER API',
                version: process.env.API_VERSION,
                timestamp: Date.now(),
                description: 'Ditter API'
            }, {},
            "API INFORMATION"
            );
        } catch(err) {
            responseBuilder.sendInternalServerError(req,res);
            console.log(err);
            throw err;
        }
}

module.exports = router