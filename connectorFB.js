// firebird connector unit
//@2018 Fixosoft
var credents = require('./credents');
var pool = mysql.createPool(credents.fb);
