// Your db.js file should create a connection to your MySQL database and export
// that connection using CommonJS syntax.

const mysql = require('mysql2');


// At home:
const dbConfig = {
	host: 'localhost',
	database: 'compx322',
	user: 'root',
	password: ''
}


// Remember to uncomment this on submission!!
/*
// At uni:
const dbConfig = {
	host: 'learn-mysql.cms.waikato.ac.nz',
	database: 'sh382',
	user: 'sh382',
	password: 'my194232sql'
}
*/



// connect
const db = mysql.createConnection(dbConfig);
db.connect(err =>{
	if (err){
	throw err;
	}
	console.log('We have connected');
});

module.exports = db;