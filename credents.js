// mysql connector credentials
//@2018 Fixosoft


exports.cfg = {
    host: "10.66.77.4",
    user: "gkndata_backend",
    password: "123",
    database: 'gkndatabase',
    connectTimeout: 10000
};

exports.ads_cfg = {
    host: "10.66.77.4",
    user: "gkndata_backend",
    password: "123",
    database: 'Entity',
    connectTimeout: 10000
};
//well known credentials. Default for firebird server
exports.fb ={
    host: "10.66.77.4",
    user: "sysdba",
    password: "masterkey",
    database: '26',
    connectTimeout: 10000

};

exports.FBAliases = 
{
    "2601": "CADASTER_krasn_n.gdb",
    "2604": "Cadaster_novoaleks_n.gdb" ,       
    "2605": "cadaster.gdb",    
    "2606": "CADASTER_IZOB.GDB"
};
