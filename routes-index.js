var router = require('express').Router();
/**
 * Handling  the APIs and rout them to each router.
 * Checking on methods of request.
 */

//Allow CORS
router.use(function (req, res, next) {
    // .. some logic here .. like any other middleware
    global.req=req;

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, X-Custom-Header, Content-Type, Accept, Authorization, errorcode, errormessage, server-name ,version-number,x-access-token,platform-number');
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS");
    res.header('Access-Control-Expose-Headers', "errorcode, errormessage, server-name");

    //Add server name 
    res.header('server-name', 'your-server');

    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
        return;
    }
    next();
});

router.use(function (req, res, next) {
    next();
});

//All APIs
router.use('/v1/shipments', require('./app/routes/shipment-router'));
module.exports = router;