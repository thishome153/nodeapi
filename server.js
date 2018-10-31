//node.js Web service 
//@2018 Fixosoft
servicename = "srv1@nodeapi"
ver = "1.0.0.9";
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
			'<img alt="git_cat.jpg" src="data:image/png;base64,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" </img>' + 
		'<br> <h2> '+servicename + ' v'+ver + '</h2>'+
		'<br> <h7> service listen  :'+port + '</h7>'+		
		'<br> please specify you request.<br>' +

		'<br> Example: '+

		'<br> <li> To find object: <br>' +
		'<a href="find?CNumber=26:01:000000:511">server/find?CNumber=99:88:112233:65536</a> </li>'+

		'<br> <li> To find EGRZ object: <br>' +
		'<a href="fb/egrz/find?cn=26:01:0:536">server/fb/egrz/find?cn=26:01:0:536</a> </li>'+
		
		'<br><br><br>' +
		'@2018 Fixosoft'+
	'</html>')
});

//*************************  Firebird  *************************
app.get('/fb/egrz/find', function (req, res) {
	var tm = new Date();
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		"service": "nodeapi " + ver,
		"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
		"query":  "EGRZ search by cn = " + req.query.cn,
		"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
		"state":200
	}, null, 3) );
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
console.log(' node.js service ' + servicename + ' v' + ver);
console.log(' Started ' + ts);
console.log(' Listen port :' + port);
