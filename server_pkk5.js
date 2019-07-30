
var packageJSON = require('./package.json');
var https = require('https');

exports.GETReq = function (req, res) {
	console.log('detected request GET...pkk5 wrapper');
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	https.get('https://pkk5.rosreestr.ru/api/features/1/26:5:43019:22', (resp) => {
		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(JSON.parse(data).explanation);
		});


		res.send(JSON.stringify({
			"ServiceName": packageJSON.name,
			"Description": packageJSON.description,
			"Version": packageJSON.version,
			"Client": clientip + " login log",
			"Request": req.query,
			"Response" : resp,
			"Purpose": "pkk5 REST api wrapper",
			"Timestamp": tm,
			"state": 200,
			"stateText": "Server ok"
		}));



	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});


};