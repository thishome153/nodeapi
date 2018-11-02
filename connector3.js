// mysql connector unit
//@2018 Fixosoft
var mysql = require('mysql');
var credents = require('./cfg/credents');
var pool = mysql.createPool(credents.cfg);
var pool_ads = mysql.createPool(credents.ads_cfg);

exports.getSubRF = function(city, callback) {
    var sql = "SELECT subrf_kn, subrf_Name FROM subrf";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); callback(true); return; }
      // make the query
      connection.query(sql, [city], function(err, results) {
        connection.release();
        if(err) { console.log(err); callback(true); return; }
        callback(false, results);
      });
    });
  };
  

  exports.getRecords = function(cn, callback) {
    var sql = "select   (SELECT COUNT(lottable.lottable_id) FROM lottable) as Parcels,"+
              "(SELECT count(vidimus.vidimus_id) FROM vidimus) as vidimusCount,"+
              "(select count(blocks.block_id) from blocks ) as BlockCount, "+
              "(select count(kpt.kpt_id) from kpt ) as KPTCount";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); callback(true); return; }
      // make the query
      connection.query(sql, [cn], function(err, results) {
        connection.release();
        if(err) { console.log(err); callback(true); return; }
        callback(false, results);
      });
    });
  };

exports.FindParcel = function(cn, callback) {
    var sql = "SELECT lottable_id,lot_kn, lot_comment FROM lottable WHERE lot_kn=?";
    // get a connection from the pool
    pool.getConnection(function(err, connection) {
      if(err) { console.log(err); callback(true); return; }
      // make the query
      connection.query(sql, [cn], function(err, results) {
        connection.release();
        if(err) { console.log(err); callback(true); return; }
        callback(false, results);
      });
    });
  };
  

    function getAds(city, callback) {
    var sql = "SELECT * FROM advertisement";
    // get a connection from the pool
    pool_ads.getConnection(function(err, connection) {
      if(err) { console.log(err); callback(true); return; }
      // make the query
      connection.query(sql, [city], function(err, results) {
        connection.release();
        if(err) { console.log(err); callback(true); return; }
        callback(false, results);
      });
    });
  };


  //image

  exports.getAdsBlob =function(cn, callback){
 
   getAds(cn, function(errrr, resWithBlobs){
    
    resWithBlobs.forEach(element => {
      if (element.image) {
      var buffer = new Buffer( element.image); //, 'binary' );
      var bufferBase64 = buffer.toString('base64');
      element.image = bufferBase64;  
      //var jpeg = 'data:image/jpeg;base64,' + btoaLatin1(element.image);
      }
    });
    

    callback(false, resWithBlobs);
    
   });
  };
  
  // clear example : 
  /*
  //database.js
  var mysql = require('mysql');

var pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
  supportBigNumbers: true
});

// Get records from a city
exports.getRecords = function(city, callback) {
  var sql = "SELECT name FROM users WHERE city=?";
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, [city], function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

//Route 
var db = require('../database');

exports.GET = function(req, res) {
  db.getRecords("San Francisco", function(err, results) {
    if(err) { res.send(500,"Server Error"); return;
    // Respond with results as JSON
    res.send(results);
  });
};
  */
