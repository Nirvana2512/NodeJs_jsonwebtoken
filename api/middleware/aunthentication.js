const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized!'
            })
        }
        jwt.verify(token, 'secret', async (err, decoded) => {
            if (!err) {
                console.log('decoded', decoded);
                const user = await User.findById(decoded.userId);
                console.log('user', user);
                if (user) {
                    req.user = user;
                    next();
                } else {
                    return res.status(401).json({
                        message: 'Unauthorized!'
                    })
                }
            } 
            return res.status(401).json({
                message: 'Unauthorized!'
            })
        
    });


} catch (e) {
    console.log(e);
    res.status(401).json({
        message: e
    })
}
}