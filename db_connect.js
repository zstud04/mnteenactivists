const mysql= require('mysql')


//SQL CPanel connection
const pool = mysql.createPool({
    host: 'p3plzcpnl489452.prod.phx3.secureserver.net',
    user: "admin",
    password: "Saguaro157$2",
    database: "MTA"
});

module.exports=pool