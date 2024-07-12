const jwt = require('jsonwebtoken')
const secretKey = '$h:n(?bj'

function authenticateToken (req,res,next){
    const userToken =  req.headers['authorization']
    if(userToken == null){
        return res.status(401).json({ msg: 'No token provided' });
    }    
    jwt.verify(userToken,secretKey,(err,user)=>{
        if (err) {
            return res.status(403).json({ msg: 'Token is not valid' });
        }
        req.user = user
        next()
    })
}

module.exports = {authenticateToken}