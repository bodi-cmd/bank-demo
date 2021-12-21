if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

const mysql = require('mysql');

const db_data = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
  }

module.exports.connection = mysql.createPool({
    ...db_data,
    connectionLimit: 5
}); 