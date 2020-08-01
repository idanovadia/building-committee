
const mysql = require("mysql");

var mysqlConnection = mysql.createPool({
    host: 'idan.mysql.database.azure.com',
    port : '3306',
    user : 'idanov@idan',
    password : 'idaN1234',
    database : 'committee',
    ssl: true,
    multipleStatements : true
});

// var mysqlConnection = mysql.createConnection({
//   host: 'localhost',
//   port : '3306',
//   user : 'root',
//   password : 'idaN1234!',
//   database : 'committee',
//   multipleStatements : true
// });

mysqlConnection.getConnection(
	function (err) { 
	if (err) { 
		console.log("!!! Cannot connect !!! Error:");
		throw err;
	}
	else
	{
	   console.log("Connection established.");
	}	
});

module.exports = mysqlConnection;