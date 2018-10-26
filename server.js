//node.js Web service 
//@2018 Fixosoft
servicename = "srv1"
ver = "1.0.0.7";
trafTotal =0;
ts = new Date();// save startup time

var express = require('express'),
	app = express(),
	
	port = process.env.port || 3050;

var db = require('./connector3');


//*************************  root / URL  *************************

app.get('/', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	//res.header("Access-Control-Allow-Origin", "http://10.66.77.47;http://www.geo-complex.com");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	db.getRecords("Some value - NC", function(err, results) {
		if(err) { 
		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"state":503,
			"stateText": "Server Error"
		}, null, 3));
		return;}

		
	res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"query":  results,
			"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
			"state":200
		}, null, 3) );

		console.log('client ' + clientip + ' accepted GET ' + tm.toLocaleTimeString() + " : connection status ok");

	});

});

app.get('/subrf', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	db.getSubRF("Some value - NC", function(err, results) {
		if(err) { 
		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"state":503,
			"stateText": "Server Error"
		}, null, 3));
		return;}

		
	res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"query":  results,
			"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
			"state":200
		}, null, 3) );

		console.log('client ' + clientip + ' accepted GET ' + tm.toLocaleTimeString() + " : connection status ok");

	});

});

//*************************  help  (test only, no Mysql links)  *************************
app.get('/h', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'text/html');
	res.send('<html>' +
			'<head>' +
			'<meta http-equiv="Content-Type" content="text/html;charset=utf-8" <meta charset="UTF-8">'+
			'<title>API help page</title>'+
		'<h2> node.js API REST working at ' + port + '</h2>'+
		'<br> please specify you request.' +
		'<br> Example for find object:' +
		'<br> /find?CNumber=99:88:112233:65536'+
		'<br> /h for help' +
		'<br><br><br>' +
		'@2018 Fixosoft'+
	'</html>')
});

//*************************  find  *************************

app.get('/find', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');
	
	db.FindParcel(req.query.CNumber, function(err, results) {
		if(err) { 
		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"state":503,
			"stateText": "Server Error"
		}, null, 3));
		return;}

		
	res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"query":  results,
			"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
			"state":200
		}, null, 3) );

		console.log('client ' + clientip + ' accepted GET ' + tm.toLocaleTimeString() + " : connection status ok");

	});

});

app.get('/ads', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	//res.header("Access-Control-Allow-Origin", "http://10.66.77.47;http://www.geo-complex.com");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');
	db.getAdsBlob("Some value - NC", function(err, results) {
		if(err) { 
		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"state":503,
			"stateText": "Server Error"
		}, null, 3));
		return;}

		
	res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": "node.js Web server",
			"name": servicename,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"version": ver,
			"platform": "node.js v8.11.3",
			"port": port,
			"query":  results,
			"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
			"state":200
		}, null, 3) );

		console.log('client ' + clientip + ' accepted GET/ads ' + tm.toLocaleTimeString() + " : connection status ok");

	});

});


/*
bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/nodeapiRoutes'); //importing route
routes(app); //register the route
*/









app.listen(port);
console.log('node.js service ' + servicename + ' v' + ver + ' started ' + ts + ' on ' + port);
