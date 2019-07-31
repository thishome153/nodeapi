var packageJSON = require('./package.json');
var https = require('https');
var http = require('http');


exports.GETReq = function (req, res, callback) {
	console.log('detected request GET...pkk5 wrapper');
	var tm = new Date();
	var clientip = (req.headers["X-Forwarded-For"] || req.headers["x-forwarded-for"] || '').split(',')[0] || req.client.remoteAddress || req.host;
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Referrer', 'ref-ref-ref');

	console.log('http request: '+ req.url);

	/*
	//Print to console params :
	var oQueryParams;
	queryString = require('querystring');
    // get query params as object
    if (req.url.indexOf('?') >= 0) {
        oQueryParams = queryString.parse(req.url.replace(/^.*\?/, ''));

        // do stuff
        console.log(oQueryParams);
    }
*/
	if (req.query.cn)
	{
	console.log('cn:' + req.query.cn);	
	var pkk5URL = 'https://pkk5.rosreestr.ru/api/features/1/'+ req.query.cn;//26:5:43019:22'; //?tolerance=1&limit=11';
	var FirURL = 'http://rosreestr.ru/api/online/fir_object/'+ req.query.cn;
	}
	else
	{
	var pkk5URL = 'https://pkk5.rosreestr.ru/api/features/1/26:5:43019:22'; //?tolerance=1&limit=11';
	var FirURL = 'http://rosreestr.ru/api/online/fir_object/26:6:0:1975456562';
	}

	var TittleMessage = {
		"ServiceName": packageJSON.name,
		"Description": packageJSON.description,
		"Version": packageJSON.version,
		"Client": clientip + " login log",
		"Request": req.query,
		"Purpose": "pkk5 REST api wrapper",
		"Timestamp": tm};

		var optionsReq = { 
			hostname: 'pkk5.rosreestr.ru',
			path: '/api/features/1/26:5:43019:22',
			method: 'GET',
			headers: {'Cookie': 'myCookie=myvalue'}
		};

		var optionsFIR = { 
			hostname: 'rosreestr.ru',
			path: '/api/online/fir_object/26:5:43019:24',
			method: 'GET',
			headers: {'Cookie': 'myCookie=myvalue'}

		};

	//var reqHTTP = http.request(optionsFIR, function(resp) {
	//	var reqHTTP = http.request(optionsFIR, (resp) => {		
	//https.get(pkk5URL, (resp) => {		
	http.get(FirURL, (resp) => {

		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});


		// The whole response has been received. Print out the result.
		/*
		resp.on('end', () => {
			console.log(JSON.parse(data).explanation);
		});
*/
  if (resp.statusCode == 200)
  {
		resp.on('end', () => {
          var ConcatedJSON ={
			  "Title": TittleMessage,
				"state": 200,
				"stateText": "Server ok",
				"Source": JSON.parse(data)
			};

			let options = {
				maxAge: 1000 * 60 * 15, // would expire after 15 minutes
				httpOnly: true, // The cookie only accessible by the web server
				signed: true // Indicates if the cookie should be signed
			}
		    res.cookie('cookieName', 'cookieValue', options) // options is optional
			res.send(
				ConcatedJSON
			);
			callback(false, ConcatedJSON);

		});
	}

	if (resp.statusCode == 204)
	{
			var ConcatedJSON ={
				"Title": TittleMessage,
				  "state": 204,
				  "stateText": resp.statusMessage,
			  };
  
			  console.log('http response:' + resp.statusMessage);
  
			  res.send(  ConcatedJSON );
			  callback(false, ConcatedJSON);
	  }




	}).on("error", (err) => {

		res.send(JSON.stringify({
            "Tittle": TittleMessage,
			"Request": req.query,
			"Message": err,
			"state": 500,
			"stateText": "Server errror " + err.message
		}));
		callback(true, err.Message);
		console.log("Error: " + err.message);
	});


};