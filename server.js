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
app.get('/fb/egrz/find', function (req, res) {
	var tm = new Date();
	console.log('Accepted GET ' + tm.toLocaleTimeString() + " - firebird query");
	res.header("Access-Control-Allow-Origin", "*");
	//res.setHeader('Content-Type', 'application/json');
	res.setHeader('Content-Type', 'text/html');
	/*
		res.header("Access-Control-Allow-Origin", "*");
		//res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Type', 'text/html');	
		res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.setHeader('Expires', '-1');	
	*/

	var dbFB = require('./connectorFB');

	dbFB.GetOBJFullbyCN(req.query.cn, function (err, results) {
			if (err) {
				res.send(JSON.stringify({
					"service": "nodeapi " + packageJSON.version,
					"Target": "Firebird",
					"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
					"stateText": "Server Error " + results.message,
					"state": 503,
				}, null, 3));
				return;
			}

			//render report page 'objlot' (human readable, HTML pretty of coarse):

			if (results.length == 1) {
			 
				// call view engine 'ejs'
				
				res.render('pages/objlot',
				{cn : results[0].KN_OBJ,
					NAMEVID_OBJLOT : results[0].NAMEVID_OBJLOT,
					SQDECL_OBJLOT  : results[0].SQDECL_OBJLOT,
					SQTOCH_OBJLOT  : results[0].SQTOCH_OBJLOT,
					SQTOCHDATE_OBJLOT: results[0].SQTOCHDATE_OBJLOT,
					RAZRVID_OBJLOT : results[0].RAZRVID_OBJLOT,
					NAME_KLS : results[0].NAME_KLS,
					PLACEDISC_ASNUM : results[0].PLACEDISC_ASNUM,
					GID_OBJ 		: results[0].GID_OBJ
				}	);
				
							
				//works ok: HTML static page res.sendFile(path.join(__dirname + '/objlotpage.html'));

				/*
				//works ok:  JSON response:
				res.send(JSON.stringify({
					"service": "nodeapi " + packageJSON.version,
					"description": packageJSON.description,
					"Target": "Firebird",
					"query": results,
					"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
					"state": 200
				}, null, 3));
				*/
			} else {
				res.render('pages/404Error',
				{
				Target:"Firebird",
				SearchCriteria: req.query.cn}
				);
				/*
				res.send(JSON.stringify({
					"service": "nodeapi " + packageJSON.version,
					"description": packageJSON.description,
					"Target": "Firebird",
					"queryContent": req.query.cn,
					"queryTimeStamp": tm.toLocaleDateString() + " " + tm.toLocaleTimeString(),
					"stateText": "notFound",
					"state": 404
				}, null, 3));
				*/
			}

		}

	);
});


//*************************  root / URL  *************************

app.get('/', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
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

		console.log('client ' + clientip + ' accepted GET ' + tm.toLocaleTimeString() + " : connection status ok");

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

//*************************  help  (test only, no Mysql links)  *************************
app.get('/h', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'text/html');
	res.send('<html>' +
		'<head>' +
		'<meta http-equiv="Content-Type" content="text/html;charset=utf-8" <meta charset="UTF-8">' +
		'<title>API help page</title>' +
		'<img alt="node_logo.png" src="'+ 
		//path.join(__dirname + '..///images/node_logo.png') + '" </img>'+
		'http://www.geo-complex.com/images/node_logo.png" </img>' +
		'<br> <h2> ' + packageJSON.name + ' v' + packageJSON.version + '</h2>' +
		'<br> <h7> Service start at: ' + ts.toLocaleDateString() + " " + ts.toLocaleTimeString() +
		'<br> listen  :' + port + '.</h7>' +
		'<br> <br> Please specify you request.<br>' +

		'<br> Example: ' +

		'<br> <li> To find object: <br>' +
		'<a href="find?CNumber=26:01:000000:511">server/find?CNumber=99:88:112233:65536</a> </li>' +

		'<br> <li> To find EGRZ object: <br>' +
		'<a href="fb/egrz/find?cn=26:05:041308:1">server/fb/egrz/find?cn=26:05:041308:1</a> </li>' +

		'<br><br><br>' +
		'@2018 Fixosoft' +
		'</html>')
});


	/*
	var Firebird = require('node-firebird');
	var credents = require('./cfg/credents');
	
Firebird.attach(credents.fb, function(err, db) {

    if (err)
        throw err;

    // db = DATABASE
    db.query("select * from obj where obj.id_obj = 'Mah2FF 3EE'", function(err, result) {
		console.log('firebird querying:....');
	//	console.log(result[0].ID_OBJ);
	//	console.log(result[0].NAME_OBJ);		
		res.send(JSON.stringify({
			"service": "nodeapi " + packageJSON.version,
			"startAt": ts.toLocaleDateString()+" "+ ts.toLocaleTimeString(),
			"query":  result,
			"queryTimeStamp": tm.toLocaleDateString()+" "+ tm.toLocaleTimeString(),
			"state":200
		}, null, 3) );

        // IMPORTANT: close the connection
        db.detach();
    });

});
*/



//*************************  find  *************************

app.get('/find', function (req, res) {
	console.log('detected request GET...');

	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
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