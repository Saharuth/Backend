const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1]
    if (!token){
        return res.status(403).send("A Token is required for authentication!.")
    }
    try {
        const decode = jwt.verify(token, secret);
        req.user = decode
    } catch (err) {
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken