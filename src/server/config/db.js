var mysql = require('mysql');
const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "mysql",
    database : "kj04",
})

module.exports = db;