
var packageJSON = require('./package.json');

exports.GETReq = function (req, res) {
	console.log('detected request GET...pkk5 wrapper');
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify({
		"ServiceName": packageJSON.name,
		"Description": packageJSON.description,
		"Version": packageJSON.version,
		"Client": clientip + " login log",
        "Request": req.query,
        "Purpose" : "pkk5 REST api wrapper",
		"Timestamp": tm,
		"state": 200,
		"stateText": "Server ok"
	}));
};