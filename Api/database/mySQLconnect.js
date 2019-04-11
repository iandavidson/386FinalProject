let mysql = require('mysql');

let connection = mysql.createConnection({
    debug: true,

	host: 'localhost',
	port: 3306,
	user: 'cs386_davidson',
	password:'da5914',
	database: 'cs386_davidson'
});

module.exports = connection;
