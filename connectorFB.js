// firebird connector unit
//@2018 Fixosoft
var credents = require('./cfg/credents');
var Firebird = require('node-firebird');


exports.JustQuery = function (request_cn, callback) {

    Firebird.attach(credents.fb, function(err, db) {

            if (err)    throw err;
            // db = DATABASE
    db.query("select * from obj where obj.id_obj = 'Mah2FF 3EE'", 
          function(err, results) 
             {
                console.log('firebird querying:....');
              // IMPORTANT: close the connection
                db.detach();
                if(err) { 
                        console.log(err); 
                        callback(true); 
                        return; 
                    }
                callback(false, results); // return results
             }
            );
    });
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

exports.getOBJ = function(objproperties, callback) {
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
