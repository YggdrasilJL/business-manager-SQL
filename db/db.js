require('dotenv').config();
const mysql = require('mysql2')
// put your OWN database settings and mysql host, user and password example shown below
/* 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'manage_bus'
}) 
*/

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

module.exports = connection