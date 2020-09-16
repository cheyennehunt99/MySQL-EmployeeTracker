'use strict';

const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your own password', //your password to MySQL
    database: 'employeetracker_db' //create the DB in MySQL
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;
