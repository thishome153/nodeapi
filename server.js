//node.js Web service 
//@2018 Fixosoft
var packageJSON = require('./package.json');
trafTotal = 0;
ts = new Date(); // save startup time
var path = require("path");
var express = require('express'),
	app = express(),
	port = process.env.port || 3050;

// set the view engine to ejs
//var ejs = require('ejs');
//var ejs = require('html');
app.set('view engine', 'ejs');

var db = require('./connector3');



//*************************  Firebird  *************************
//TODO: need format parameter j- JSON h - HTML
app.get('/fb/egrz/find', function (req, res) {
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log(tm.toLocaleTimeString() + '. Client ' + clientip + ' request GET...	- firebird query ');

	res.header("Access-Control-Allow-Origin", "*");
	/*
		res.header("Access-Control-Allow-Origin", "*");
		//res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Type', 'text/html');	
		res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.setHeader('Expires', '-1');	
	*/

	var dbFB = require('./connectorFB');
	endFunc:
		dbFB.GetOBJFullbyCNpool(req.query.cn, function (err, results) {
			if (err) {
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify({
					"service": "nodeapi " + packageJSON.version,
					"Target": "Firebird",
					"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
					"stateText": "Server Error " + results.message,
					"state": 503,
				}, null, 3));
				//return;    // - return will returned to call back callbacker
				// else instead of return.... i'm so stupied
			} 
			else
			//otherwise, response`ll in HTML:
			//(human readable, HTML pretty of coarse):
			{
				if (results.length == 1) {

					// call view engine 'ejs'
					//render report page 'objlot' 
					if (req.query.f == 'html') {
						res.setHeader('Content-Type', 'text/html');
						res.render('pages/objlot', {
							cn: results[0].KN_OBJ,
							NAMEVID_OBJLOT: results[0].NAMEVID_OBJLOT,
							SQDECL_OBJLOT: results[0].SQDECL_OBJLOT,
							SQTOCH_OBJLOT: results[0].SQTOCH_OBJLOT,
							SQTOCHDATE_OBJLOT: results[0].SQTOCHDATE_OBJLOT,
							RAZRVID_OBJLOT: results[0].RAZRVID_OBJLOT,
							NAME_KLS: results[0].NAME_KLS,
							PLACEDISC_ASNUM: results[0].PLACEDISC_ASNUM,
							GID_OBJ: results[0].GID_OBJ
						});
					} else {
						res.setHeader('Content-Type', 'application/json');
						//works ok:  JSON response:
						res.send(JSON.stringify({
							"service": "nodeapi " + packageJSON.version,
							"description": packageJSON.description,
							"Target": "Firebird",
							"query": results,
							"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
							"state": 200
						}, null, 3));
					}


				} else {
					if (req.query.f == 'html') {
						res.setHeader('Content-Type', 'text/html');
						res.render('pages/404Error', {
							Target: "Firebird",
							SearchCriteria: req.query.cn
						});
					} else {
						res.send(JSON.stringify({
							"service": "nodeapi " + packageJSON.version,
							"description": packageJSON.description,
							"Target": "Firebird",
							"queryContent": req.query.cn,
							"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
							"stateText": "notFound",
							"state": 404
						}, null, 3));
					}
				}

			}
		}); // end of function call

});


app.get('/fb/fteo/find', function (req, res) {
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log(tm.toLocaleTimeString() + '. Client ' + clientip + ' request GET...	- firebird query ');

	res.header("Access-Control-Allow-Origin", "*");
	/*
		res.header("Access-Control-Allow-Origin", "*");
		//res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Type', 'text/html');	
		res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.setHeader('Expires', '-1');	
	*/

	var dbFB = require('./connectorFB');
});

//*************************   /info - query for info about GKNData (mySQL)  *************************
app.get('/info', function (req, res) {
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log(tm.toLocaleTimeString() + '. Client ' + clientip + ' request GET...	/info ');
	//res.header("Access-Control-Allow-Origin", "http://10.66.77.47;http://www.geo-complex.com");
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	db.getRecords("Some value - NC", function (err, results) {
		if (err) {
			res.send(JSON.stringify({
				"service": "nodeapi",
				"brand": "Fixosoft",
				"description": packageJSON.description,
				"name": packageJSON.name,
				"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
				"version": packageJSON.version,
				"platform": "node.js v8.11.3",
				"port": port,
				"state": 503,
				"stateText": "Server Error"
			}, null, 3));
			return;
		}


		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": packageJSON.description,
			"name": packageJSON.name,
			"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
			"version": packageJSON.version,
			"platform": "node.js v8.11.3",
			"port": port,
			"query": results,
			"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
			"state": 200
		}, null, 3));
	});
});

app.get('/subrf', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	db.getSubRF("Some value - NC", function (err, results) {
		if (err) {
			res.send(JSON.stringify({
				"service": "nodeapi",
				"brand": "Fixosoft",
				"description": packageJSON.description,
				"name": packageJSON.name,
				"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
				"version": packageJSON.version,
				"platform": "node.js v8.11.3",
				"port": port,
				"state": 503,
				"stateText": "Server Error"
			}, null, 3));
			return;
		}

		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": packageJSON.description,
			"name": packageJSON.name,
			"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
			"version": packageJSON.version,
			"platform": "node.js v8.11.3",
			"port": port,
			"query": results,
			"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
			"state": 200
		}, null, 3));

		console.log('client ' + clientip + ' accepted GET ' + tm.toLocaleTimeString() + " : connection status ok");

	});

});

//************************* root (index`ll show help  (test only, no Mysql links)  *************************
app.get('/', function (req, res) {
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log(tm.toLocaleTimeString() + '. Client ' + clientip + ' request GET...	/"index"');
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'text/html');

	res.render('pages/index', {
		version: packageJSON.version,
		servicename: packageJSON.name,
		startdate: ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
		port: port
	});

});





//*************************  find  *************************

app.get('/find', function (req, res) {


	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	console.log('Client ' + clientip + 'detected request GET.../find');
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');

	db.FindParcel(req.query.CNumber, function (err, results) {
		if (err) {
			res.send(JSON.stringify({
				"service": "nodeapi",
				"brand": "Fixosoft",
				"description": packageJSON.description,
				"name": packageJSON.name,
				"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
				"version": packageJSON.version,
				"platform": "node.js v8.11.3",
				"port": port,
				"state": 503,
				"stateText": "Server Error"
			}, null, 3));
			return;
		}


		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": packageJSON.description,
			"name": packageJSON.name,
			"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
			"version": packageJSON.version,
			"platform": "node.js v8.11.3",
			"port": port,
			"query": results,
			"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
			"state": 200
		}, null, 3));

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
	db.getAdsBlob("Some value - NC", function (err, results) {
		if (err) {
			res.send(JSON.stringify({
				"service": "nodeapi",
				"brand": "Fixosoft",
				"description": packageJSON.description,
				"name": packageJSON.name,
				"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
				"version": packageJSON.version,
				"platform": "node.js v8.11.3",
				"port": port,
				"state": 503,
				"stateText": "Server Error"
			}, null, 3));
			return;
		}


		res.send(JSON.stringify({
			"service": "nodeapi",
			"brand": "Fixosoft",
			"description": packageJSON.description,
			"name": packageJSON.name,
			"startAt": ts.toLocaleDateString() + " " + ts.toLocaleTimeString(),
			"version": packageJSON.version,
			"platform": "node.js v8.11.3",
			"port": port,
			"query": results,
			"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
			"state": 200
		}, null, 3));

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
console.log(' node.js service ' + packageJSON.name + ' v' + packageJSON.version);
console.log(' Started ' + ts);
console.log(' Listen port :' + port);