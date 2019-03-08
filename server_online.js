
var packageJSON = require('./package.json');
exports.Online = function (req, res) {
	console.log('detected request GET...Online');
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	res.send(JSON.stringify({
		"ServiceName": packageJSON.name,
		"Description": packageJSON.description,
		"Version": packageJSON.version,
		"Client": clientip + " login log",
		"Type": "Test Online",
		"Timestamp": tm,
		"state": 200,
		"stateText": "Server ok"
	}));
};