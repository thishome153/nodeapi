// mysql connector credentials
//@2018 Fixosoft


exports.cfg = {
    host: "host_ip",
    user: "username",
    password: "userpassword",
    database: 'databasename',
    connectTimeout: 10000
};

exports.ads_cfg = {
    host: "host_ip",
    user: "username",
    password: "userpassword",
    database: 'adsdatabasenae',
    connectTimeout: 10000
};

//well known credentials. Default for firebird server
exports.fb ={
    host: "host_ip",
    port: 3050,
    user : 'SYSDBA',
    password : 'masterkey',
    database : 'database.gdb',
    connectTimeout: 10000,
    lowercase_keys : false, // set to true to lowercase keys
    role :null,            // default
    pageSize : 4096
};



exports.FBAliases = 
{
    "2601": "CADASTER_****.gdb",
    "2604": "Cadaster_****.gdb" ,       
    "2605": "cadaster.gdb",    
    "2606": "CADASTER_****.GDB"
};
