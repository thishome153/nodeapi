//@2019 Fixosoft
var packageJSON = require('./package.json');
var db = require('./connector3');

exports.Server_log = function (req, res) {
        var tm = new Date();
        var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');

        var LogData = {
            ip: clientip,
            Host: req.query.Host,
            ServiceName: packageJSON.name + " v" + packageJSON.version,
            TimeStamp: tm.toLocaleDateString() + " " + tm.toLocaleTimeString()
        };

        if (req.query.AppType == undefined)
            LogData.AppType = "AppType expected"
        else
            LogData.AppType = req.query.AppType;

        if (req.query.AppVer == undefined)
            LogData.AppVersion = "AppVer expected"
        else
            LogData.AppVersion = req.query.AppVer;

        if (req.query.UserName == undefined)
            LogData.UserName = "user expected"
        else
            LogData.UserName = req.query.UserName;


        /* // QUERY most be like this: 
        INSERT INTO `AppLog` (`App_id`, `Service`, `Client`, `App_Type`, `App_Version`, `Log_Type`, `Timestamp`, `State`, `StateText`, `UserName`) 
        VALUES (NULL, 'nodeapi', '10.66.77.150 login log', 'AppType expected', 'NC', 'Login log', '2019-03-05T05:34:12.117Z', '200', 'Server ok', '-- TODO ')
        */


        db.Writelog(LogData, function (err, results) {
            if (err) {
                res.send(JSON.stringify({
                    "ServiceName": packageJSON.name,
                    "Description": packageJSON.description,
                    "Version": packageJSON.version,
                    "Platform": "node.js",
                    "StartAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
                    "Timestamp": LogData.TimeStamp,
                    "Client": clientip + " login log",
                    "ApplicationType": LogData.AppType,
                    "state": 503,
                    "stateText": "Server Error"
                }, null, 3));
                return;
            }


            res.send(JSON.stringify({
                "ServiceName": packageJSON.name,
                "Description": packageJSON.description,
                "Version": packageJSON.version,
                "Client": clientip + " login log",
                "ApplicationType": LogData.AppType,
                "AppVersion": LogData.AppVersion,
                "Type": "Login log",
                "Timestamp": LogData.TimeStamp,
                "state": 200,
                "stateText": "Server ok"
            }, null, 3));

            console.log('Log Client ' + clientip + ' ' + tm.toLocaleDateString() + " " + tm.toLocaleTimeString() + " " + LogData.AppType + " " + LogData.AppVersion);

        });
    };