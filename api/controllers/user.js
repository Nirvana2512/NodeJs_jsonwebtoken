const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


createHash = (password) => {
    return new Promise((resolved, reject) => {
        try {
            bcrypt.hash(password, 10, (err, hash) => {
                if (hash) {
                    resolved(hash);
                }
                reject(err);

            });
        } catch (e) {
            console.log(e);
            reject(err);
        }
    })
}
verifyPassword = (newPassword, hash) => {
    return new Promise((resolved, reject) => {
        try {
            bcrypt.compare(newPassword, hash, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolved(result);

            });
        } catch (e) {
            console.log(e);
            reject(err);
        }
    })
}

createToken = (userId) => {
    const token = jwt.sign({ userId }, 'secret', { expiresIn: 60 * 60 });
    return token;
}
module.exports.register = async (req, res, next) => {
    try {
        const password = await createHash(req.body.password);
        console.log('password', password);
        const user = {
            name: req.body.name,
            username: req.body.username,
            password: password
        }
        const userData = await User.create(user);
        console.log('userData', userData);
        delete userData._doc.password;
        res.json(
            {
                message: 'successful',
                playload: userData
            }
        );
    } catch (e) {
        console.log(e);
        res.json({
            error: e.message
        });
    }
}
module.exports.login = async (req, res) => {
    try {
        const userData = await User.findOne(req.body.username);
        if (!userData) {
            res.json(
                {
                    message: 'Invalid Cridentials',
                }
            );
        }
        const isPasswordMatched = await verifyPassword(req.body.password, userData.password);
        delete userData._doc.password;

        if (isPasswordMatched) {
            const token = createToken(userData._id);
            res.json(
                {
                    message: 'successful',
                    playload: {
                        user: userData,
                        token
                    }
                }
            );
        } else {
            res.json(
                {
                    message: 'Invalid Cridentials',
                }
            );
        }
    } catch (e) {
        console.log(e);
        res.json({
            error: e.message
        });
    }
}

module.exports.get = async (req, res) => {
    try {
        console.log('Get User', user);
        const userData = await User.findById(req.params.id);
        res.json(
            {
                message: 'successful',
                playload: userData
            }
        );
    } catch (e) {
        console.log(e);
        res.json({
            error: e.message
        });
    }
}