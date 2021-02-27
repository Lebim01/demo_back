const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    if (!req.token) {
        req.isAuth = false
        return next()
    }

    try {
        const verify = await jwt.verify(req.token, process.env.HASH);
        req.uuid = verify.uuid
        req.username = verify.username
        req.isAuth = true
    }catch(err){
        
    }finally{
        next()
    }
}