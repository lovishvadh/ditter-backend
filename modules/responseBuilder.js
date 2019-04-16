
class ResponseBuilder {

    sendResponse(statusCode, status, req, res, data, headers, message) {
        data.method = req.method;
        data.path = req.path;
        return res.status(statusCode).json({
            status: (status == null || status) ? true : false,
            message,
            data
        });
    }

    sendValidationErrorsResponse(validationErrors, req, res) {
        return this.sendResponse(
            200,
            false,
            req,
            res, { errors: validationErrors }, {},
            "Data validation errors"
        );
    }

    sendInternalServerError(req, res) {
        return this.sendResponse(
            500,
            false,
            req,
            res, {}, {},
            "Server encountered some error.");
    }

    sendUnauthorizedResponse(req, res) {
        return this.sendResponse(
            401,
            false,
            req,
            res, {}, {},
            "Unauthorized");
    }
}

module.exports = new ResponseBuilder();