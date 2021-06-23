let express = require('express');
const router = express.Router();

const {
    register,
    get,
    login
} = require('../controllers/user');

const {
    verifyToken
} = require('../middleware/aunthentication');

const userRoute = (expressApp) => {
    router.post('/', register);
    router.post('/login', login);
    router.get('/:id', verifyToken, get);
    expressApp.use('/api/user', router);
}

module.exports = userRoute;