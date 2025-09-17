require('dotenv').load()
const express = require('express')

express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

const cookieParser = require('cookie-parser');
const basicAuth = require('express-basic-auth')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const ip = process.env.IP || 'localhost'
const port = process.env.PORT || 3000
const prefixPath = process.env.PREFIX_PATH || '/'
const apiDocsEnable = process.env.API_DOCS_ENABLE && process.env.API_DOCS_ENABLE == 'true' ? true : false
const configs = require('./configs/configs')
const path = require('path')
const fs = require('fs')
const notificationService = require('./modules/core/services/notificationService')
const moment = require('moment');

global.APP_ROOT_DIR = path.resolve(__dirname);

app.disable('x-powered-by')
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors({
    //origin: configs.app.frontendUrl.split(',')
    origin: '*'
}));

const timeout = require('connect-timeout');
const response = require("./libs/core/response");
app.use(timeout(configs.app.timeout, {
    respond: true
}));

function haltOnTimedoutMiddleware(req, res, next) {
    if (req.timedout) {
        return response.jsonEncrypt(req, res, {
            status: 0,
            code: 408,
            message: `Request Timeout`
        });
    }

    next();
}

app.use(haltOnTimedoutMiddleware);

const { createBullBoard } = require('@bull-board/api');
const { ExpressAdapter } = require('@bull-board/express');
const { BullAdapter } = require('@bull-board/api/bullAdapter'); // Dùng Bull

// const gunoHubWarehouseInventoryTransactionQueue = require('./modules/guno-hub/queues/warehouse/inventory.transaction.queue');
// const gunoHubWarehouseInventoryStocktakingQueue = require('./modules/guno-hub/queues/warehouse/inventory.stocktaking.queue');
// const posPancakeFmOrderUpdateStatusQueue = require('./modules/pos-pancake-fm/queues/order/update.status.queue');
// const posPancakeFmProductUpdateQuantityQueue = require('./modules/pos-pancake-fm/queues/product/variation.update.quantity.queue');
// const posPancakeFmSyncOpenNhanhVnQueue = require('./modules/pos-pancake-fm/queues/order/sync.to.open.nhanh.vn.queue');
const authMiddleware = require("./modules/core/middlewares/authMiddleware");
const roleAdminMiddleware = require("./modules/core/middlewares/role.admin.middleware");

// Tạo adapter cho Express
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(`${prefixPath}queue`);

// serverAdapter.setBasePath(`${prefixPath}queue`);
createBullBoard({
    queues: [
        // new BullAdapter(gunoHubWarehouseInventoryTransactionQueue),
        // new BullAdapter(gunoHubWarehouseInventoryStocktakingQueue),
        // new BullAdapter(posPancakeFmOrderUpdateStatusQueue),
        // new BullAdapter(posPancakeFmProductUpdateQuantityQueue),
        // new BullAdapter(posPancakeFmSyncOpenNhanhVnQueue)
    ],
    serverAdapter
});
//
// api docs
if (apiDocsEnable == true) {
    const swaggerFile = require('./swagger/swagger_output.json')
    const swaggerOptions = {
        customSiteTitle: `API documentation - ${configs.app.name}`,
        customCss: '.swagger-ui .topbar { background-color: #fff; box-shadow: 0 5px 5px 0 rgb(0 0 0 / 40%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);} .swagger-ui .topbar a { background: url(https://cloud-bizfly.cdn.vccloud.vn/images/BizFly-Cloud.svg) no-repeat; height: 40px; display: block; width: 168px; margin: 0 auto; } .swagger-ui .topbar a img { display: none }'
    }
    app.use('/api-docs', basicAuth(configs.auth.basic), swaggerUi.serveFiles(swaggerFile), swaggerUi.setup(swaggerFile, swaggerOptions))
}

//joining path of directory
const directoryModulesPath = path.join(__dirname, 'modules')
// routes grouping
app.prefix(`${prefixPath}`, (appGroup) => {

    // Gắn Bull Board vào Express
    app.use(`${prefixPath}queue`, [
        authMiddleware, roleAdminMiddleware, // decryptRequestMiddleware
    ], serverAdapter.getRouter());

    fs.readdir(directoryModulesPath, function (err, modules) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }

        //listing all files using forEach
        modules.forEach((module) => {
            if (module === '.DS_Store') return;
            try {
                const moduleRoutes = require(`${directoryModulesPath}/${module}/routes/${module}.route`)
                moduleRoutes(appGroup)
            } catch (e) {
                console.log(e)
            }
        })
    })

});

let frontendDist = null;
switch (process.env.APP_ENV) {
    case 'development':
        frontendDist = 'dev'
        break;
    case 'production':
        frontendDist = 'prod'
        break;
    case 'staging':
        frontendDist = 'staging'
        break;
}
if (frontendDist) {
    const htmlBrowser = path.join(__dirname, `/html/dist/${frontendDist}/browser`);
    app.use('/', express.static(htmlBrowser))
    console.info('Frontend is running in folder ' + htmlBrowser)
    // rewrite all url of fe to index.html
    app.get('/*', (req, res) => {
        res.sendFile(`${htmlBrowser}/index.html`, function (err) {
            if (err) {
                res.status(404).send(err)
            }
        })
    })
}

app.listen(port, ip);
console.log("Server is running!\nAPI: http://" + ip + ":" + port)
if (apiDocsEnable == true) {
    console.log("API documentation: http://" + ip + ":" + port + "/api-docs")
}

process.on('uncaughtException', function (err) {
    if (err) {
        const message = `[${configs.app.name}] - Có lỗi xảy ra lúc : ${moment().format('HH:mm:ss DD/MM/YYYY')}\n`
            + `- Lỗi: \n`
            + `${err.stack}`;
        notificationService.send(message).then(() => {});
    }
});

if (configs.app.ssl.isActive) {
    try {
        const privateKey = fs.readFileSync(configs.app.ssl.key, 'utf8');
        const certificate = fs.readFileSync(configs.app.ssl.cert, 'utf8');
        const credentials = {key: privateKey, cert: certificate};
        const https = require('https');
        const httpsServer = https.createServer(credentials, app);
        httpsServer.listen(configs.app.ssl.port, () => {
            console.log("Server is running at " + (new Date).toString() + "!\nAPI: https://" + ip + ":" + configs.app.ssl.port)
        });
    } catch (e) {
        console.log(e)
    }
}
