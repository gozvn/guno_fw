// const revenueService = require('../services/revenue.service');
const moment = require("moment");

module.exports = {
    dashboard: async (req, res) => {
        const result = {
            status: 1,
            message: 'ok',
            code: 200,
            data: []
        };

        // data = []; // await revenueService.getRevenueOverview(req.query);
        //data = sampleService.getSampleData();
        const data = ['sample data 1', 'sample data 2', 'sample data 3'];
        
        if (data.length === 0) { 
            result.data = [];
            result.status = 0;
            result.message = 'No data found';
            return res.json(result);
        };
        result.data = data;

        return res.json(result);
    }
}
