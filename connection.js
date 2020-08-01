
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
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

mysqlConnection.connect((err)=> {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  });

module.exports = mysqlConnection;