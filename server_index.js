//@2019 Fixosoft
var packageJSON = require('./package.json');
var db = require('./connector3');

exports.Server_Index = function (req, res) {
    var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log(tm.toLocaleTimeString() + ' client ' + clientip + ' request GET...	/"index"');
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'text/html');

	res.render('pages/index', {
		version: packageJSON.version,
		servicename: packageJSON.name,
		startdate: ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
		//port: port
	});
};