const socialController = require('../controllers/socialController');
const decryptRequestMiddleware = require("../../core/middlewares/decryptRequestMiddleware");

module.exports = (app) => {
    // login route
    app.post('/auth/social/login', [decryptRequestMiddleware], (req, res) => {
        return socialController.login(req, res);
    });

    app.get('/auth/:provider/request', (req, res) => {
        return socialController.request(req, res);
    });

    // callback route
    app.get('/auth/:provider/callback', [decryptRequestMiddleware], (req, res) => {
            return socialController.callback(req, res);
        });
}
