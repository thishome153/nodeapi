//@2019 Fixosoft
var packageJSON = require('./package.json');
var db = require('./connector3');
exports.Server_info = function (req, res) {
    var tm = new Date();
    var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
    console.log(tm.toLocaleTimeString() + '. Client ' + clientip + ' request GET...	/info ');
    //res.header("Access-Control-Allow-Origin", "http://10.66.77.47;http://www.geo-complex.com");
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Content-Type', 'application/json');

    db.getRecords("Some value - NC", function (err, results) {
        if (err) {
            res.send(JSON.stringify({
                "Servicename": packageJSON.name,
                "brand": "Fixosoft",
                "Description": packageJSON.description,
                "startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
                "version": packageJSON.version,
                "platform": "node.js",
                "state": 503,
                "stateText": "Server Error"
            }, null, 3));
            return;
        }


        res.send(JSON.stringify({
            "Servicename": packageJSON.name,
            "Brand": "Fixosoft",
            "Description": packageJSON.description,
            "startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
            "version": packageJSON.version,
            "platform": "node.js",
            "query": results,
            "queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
            "state": 200
        }, null, 3));
    });
};