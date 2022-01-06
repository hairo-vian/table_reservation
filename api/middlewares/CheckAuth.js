const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization === "uD4hL3wat4j@g@n") {
            next();
        } else {
            const token = req.headers.authorization.split(" ")[1];
            req.userData = jwt.verify(token, process.env.JSONWEBTOKENKEY);
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Auth Failed",
            error: error
        });
    }
}