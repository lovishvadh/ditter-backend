const jwt = require('./modules/jwt');

module.exports = async function (req, res, next) {
    try {
        const authHeadParts = req.headers.authorization;
        const decoded = await jwt.verify(authHeadParts);
        req.username = decoded.username;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({
            status: false,
            error: 'Unauthorized'
        });
    }
};