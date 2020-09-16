'use strict';

const util = require('util');
const mysql = require('mysql');

//you will need to create a DB in MySQL

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your password!', //your own password to MySQL
    database: 'employeetracker_db' //create this DB in MySQL
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;
