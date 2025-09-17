const {param} = require("express-validator");

// const authMiddleware = require('../../core/middlewares/authMiddleware')
// const ruleCheckerMiddleware = require('../../core/middlewares/ruleCheckerMiddleware')
// const decryptRequestMiddleware = require("../../core/middlewares/decryptRequestMiddleware");

// const overviewController = require('../controllers/overview.controller');
const sampleController = require('../controllers/sample.controller');

module.exports = function(app) {
    app.get('/tuan/test',
        (req, res) => {
            /*  #swagger.tags = ['Tuan']
                #swagger.description = 'Test endpoint'
                #swagger.responses[200] = {
                    schema: { "$ref": "#/definitions/ResponseSuccess" },
                    description: "Successfully." }
            */
            return sampleController.dashboard(req, res)
        });
}
