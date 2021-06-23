const userRoute = require('./user')
const routes = (app) => {
    userRoute(app);
}

module.exports = routes;