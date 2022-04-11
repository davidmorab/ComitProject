const jwt = require('jsonwebtoken')
const User = require('../models/users')

const verifyToken = async(req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({msg:'Invalid Credentials'})
    }

    let token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)

        if(!user){
            res.status(401).json({msg:'Invalid user'})
        }
        
        req.user = user;
        next()

    } catch (error) {
        res.status(500).json(error)
    }

};

module.exports = verifyToken