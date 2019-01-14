// firebird connector unit
//@2018 Fixosoft
var credents = require('./cfg/credents');
var Firebird = require('node-firebird');


function TranslateCN(cn) {
  return credents.FBAliases.basepath + credents.FBAliases[cn];
}

//First stage function - for test only connectivity
exports.JustQuery = function (request_cn, callback) {
  console.log('firebird querying:....');
  Firebird.attach(credents.fb, function (err, db) {

    if (err) throw err;
    // db = DATABASE
    db.query("select * from obj where obj.id_obj = 'Mah2FF 3EE'",
      function (err, results) {

        // IMPORTANT: close the connection
        db.detach();
        if (err) {
          console.log('firebird querying error: ' + err);
          callback(true);
          return;
        }
        console.log('firebird querying: ok. Got results');
        callback(false, results); // return results
      }
    );
  });
};

//Second stage function - 
exports.GetOBJbyCN = function (request_cn, callback) {
  console.log('function GetOBJbyCN (' + request_cn + ')');

  Firebird.attach(credents.fb, function (err, db) {
    if (err) { //  throw err;
      callback(true, err); //return error info in err
      return;
    }
    // db = DATABASE
    db.query(" select  o.Status_obj, o.KN_obj,  o.id_obj from obj o, objlot ol " +
      " where (o.id_obj = ol.id_obj) and " +
      " o.kn_obj =?", [request_cn],
      function (err, results) {
        // IMPORTANT: close the connection
        db.detach();
        if (err) {
          console.log('firebird querying error: ' + err);
          callback(true, err);
          return;
        }
        if (results.length > 0) {
          console.log('firebird querying: ok. id_obj = ' + results[0]['ID_OBJ']);
        } else
          console.log('firebird querying: ok. Empty results');
        // anyway return
        callback(false, results); // return results                    
      }
    );
  });
};

exports.GetOBJFullbyCN = function (request_cn, callback) {

  credents.fb.database = TranslateCN(request_cn.substring(0, 5));
  //  console.log('dbName for ' + request_cn.substring(0, 5) + ' = ' + credents.fb.database);

  Firebird.attach(credents.fb, function (err, db) {
    if (err) { //  throw err;
      console.log('firebird querying: Error attach ():' + err);
      callback(true, err); //return error info in err
      return;
    }
    // db = DATABASE
    db.query(" select  o.Status_obj, o.KN_obj,  o.id_obj from obj o, objlot ol " +
      " where (o.id_obj = ol.id_obj) and " +
      " o.kn_obj =?", [request_cn],
      function (err, results) {
        // IMPORTANT: close the connection
        db.detach();
        if (err) {
          console.log('firebird querying error: ' + err);
          //db.detach();
          callback(true, err);
          return;
        }

        if (results.length > 0) {
          var id_obj = results[0]['ID_OBJ'];
          console.log('firebird querying: ' + request_cn + ' object ok.');
          console.log('firebird querying: Select full query for  id_obj = ' + id_obj + '....');
          Firebird.attach(credents.fb, function (err, db) {
            db.query(" SELECT o.KN_obj, " +
              //alladr.fullatdname, 
              //"ol.FULLADR, "+
              "  an.num1_asnum ||' кв. '|| an.num3_asnum ||' cтроен. ' || an.num2_asnum," +
              " an.PlaceDisc_AsNum,  " +
              //"ol.KLADR_RAYON, "
              //"ol.KLADR_NASELPUNCT, ol.KLADR_STREET, ol.KLADR_HOME, ol.KLADR_INOE, " +
              "ol.SQTOCH_OBJLOT, ol.SQTOCHDATE_OBJLOT , " +
              "ol.SQDECL_OBJLOT,  ol.NameVid_ObjLot, ol.Razrvid_ObjLot," +
              " KLS.NAME_KLS, " +
              " FAKTISP_OBJLOT, KNSOSTAV_OBJLOT,o.GID_OBJ " +
              " FROM OBJ o" +
              "  INNER JOIN OBJLOT ol ON (o.ID_OBJ = ol.ID_OBJ) " +
              "   INNER JOIN ASNUM an ON (an.ID_asnum = Ol.ID_asnum)" +
              "   INNER JOIN ASPRF ap ON (an.ID_prf = ap.ID_prf)" +
              "   INNER JOIN ASATD ATD ON (ATD.ID_ATD = ap.ID_ATD)" +
              "   INNER JOIN HAR ON (o.ID_OBJ = HAR.ID_OBJ) " +
              "   INNER JOIN HARKAT ON (HAR.ID_HAR = HARKAT.ID_HAR) " +
              "   INNER JOIN KLS ON (HARKAT.ID_KLS = KLS.ID_KLS) " +
              //"   left JOIN GETFULLATD(ap.id_ATD) ALLAdr ON (1=1) "+
              "   where o.ID_Obj =?",
              [id_obj],
              function (err2, results2) {
                db.detach();
                if (err2) {
                  console.log('firebird querying error: ' + err2);
                  callback(true, err2);
                  return;
                }
                console.log('firebird querying: success. Detach base');
                callback(false, results2); // return results                    
                return;


              });
          });
        } else {
          console.log('firebird querying: ' + request_cn + ' - Object not found');
          callback(false, results); // return results                    
          return;
        }
        // anyway return
      }
    );

    db.detach();
  });
};

//-----------polling versions 
exports.GetOBJFullbyCNpool = function (request_cn, callback) {

  credents.fb.database = TranslateCN(request_cn.substring(0, 5));
  //  console.log('dbName for ' + request_cn.substring(0, 5) + ' = ' + credents.fb.database);
  // 5 = the number is count of opened sockets
  var pool = Firebird.pool(5, credents.fb);

  // Get a free pool
  pool.get(function (err, db) {

    if (err) { //  throw err;
      console.log('firebird querying: Error attach ():' + err);
      callback(true, err); //return error info in err
      return;
    }
    // db = DATABASE
    db.query(" select  o.Status_obj, o.KN_obj,  o.id_obj from obj o, objlot ol " +
      " where (o.id_obj = ol.id_obj) and " +
      " o.kn_obj =?", [request_cn],
      function (err, results) {
        // IMPORTANT: close the connection
        db.detach();
        if (results.length === 1) {
          var id_obj = results[0]['ID_OBJ'];
          console.log('firebird querying: ' + request_cn + ' object ok.');
          console.log('firebird querying: Select full query for  id_obj = ' + id_obj + '....');
          pool.get(function (err, db2) {
            db2.query(" SELECT o.KN_obj, " +
              //alladr.fullatdname, 
              //"ol.FULLADR, "+
              "  an.num1_asnum ||' кв. '|| an.num3_asnum ||' cтроен. ' || an.num2_asnum," +
              " an.PlaceDisc_AsNum,  " +
              //"ol.KLADR_RAYON, "
              //"ol.KLADR_NASELPUNCT, ol.KLADR_STREET, ol.KLADR_HOME, ol.KLADR_INOE, " +
              "ol.SQTOCH_OBJLOT, ol.SQTOCHDATE_OBJLOT , " +
              "ol.SQDECL_OBJLOT,  ol.NameVid_ObjLot, ol.Razrvid_ObjLot," +
              " KLS.NAME_KLS, " +
              " FAKTISP_OBJLOT, KNSOSTAV_OBJLOT,o.GID_OBJ " +
              " FROM OBJ o" +
              "  INNER JOIN OBJLOT ol ON (o.ID_OBJ = ol.ID_OBJ) " +
              "   INNER JOIN ASNUM an ON (an.ID_asnum = Ol.ID_asnum)" +
              "   INNER JOIN ASPRF ap ON (an.ID_prf = ap.ID_prf)" +
              "   INNER JOIN ASATD ATD ON (ATD.ID_ATD = ap.ID_ATD)" +
              "   INNER JOIN HAR ON (o.ID_OBJ = HAR.ID_OBJ) " +
              "   INNER JOIN HARKAT ON (HAR.ID_HAR = HARKAT.ID_HAR) " +
              "   INNER JOIN KLS ON (HARKAT.ID_KLS = KLS.ID_KLS) " +
              //"   left JOIN GETFULLATD(ap.id_ATD) ALLAdr ON (1=1) "+
              "   where o.ID_Obj =?",
              [id_obj],
              function (err2, results2) {
                db2.detach();
                if (err2) {
                  console.log('firebird querying error: ' + err2);
                  callback(true, err2);
                  return;
                }
                console.log('firebird querying: success. Detach base');
                callback(false, results2); // return results                    
                return;


              });
          });



        } else {
          console.log('firebird querying : not found ' + request_cn);
          callback(false, results);
          return;
        }

      }

    );
  });
  // Destroy pool
  pool.destroy();
};




/*
--------------------------------------------
Select  o.Status_obj, o.KN_obj,  o.id_obj
from OBJ o, OBJLOT ol 
where (o.id_obj = ol.id_obj) and
 o.kn_Obj = :knobj
--------------------------------------------



SELECT
   o.KN_obj,
    alladr.fullatdname,
    atd.Name_Atd,
    ap.name_PRF,
    an.num1_asnum ||' кв. '|| an.num3_asnum ||' —троен. ' || an.num2_asnum,
    an.PlaceDisc_AsNum,
    ol.SQTOCH_OBJLOT, ol.SQDECL_OBJLOT,
   ol.NameVid_ObjLot,
   ol.Razrvid_ObjLot, FAKTISP_OBJLOT,
   KNSOSTAV_OBJLOT,o.GID_OBJ

FROM OBJ o

   INNER JOIN OBJLOT ol ON (o.ID_OBJ = ol.ID_OBJ)   /* св€зка OBJLOT + OBJ
   INNER JOIN ASNUM an ON (an.ID_asnum = Ol.ID_asnum)
   INNER JOIN ASPRF ap ON (an.ID_prf = ap.ID_prf)
   INNER JOIN ASATD ATD ON (ATD.ID_ATD = ap.ID_ATD)
  left JOIN GETFULLATD(ap.id_ATD) ALLAdr ON (1=1)

where o.ID_Obj = :ID_Ob
*/

exports.getOBJ = function (objproperties, callback) {
  var sql = "SELECT subrf_kn, subrf_Name FROM subrf";
  // get a connection from the pool
  pool.getConnection(function (err, connection) {
    if (err) {
      console.log(err);
      callback(true);
      return;
    }
    // make the query
    connection.query(sql, [city], function (err, results) {
      connection.release();
      if (err) {
        console.log(err);
        callback(true);
        return;
      }
      callback(false, results);
    });
  });
};