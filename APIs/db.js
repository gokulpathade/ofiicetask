const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 200,
  user: "root",
  password: "Admin",
  database: "hrms",
  port: 3306,
  host: "localhost",


  waitForConnections: true,
  // connectionLimit: 100,
  queueLimit: 0,
  // timezone: 'utc', // Add this if needed
  multipleStatements: true, // Add this if needed
  supportBigNumbers: true, // Add this if needed
  dateStrings: true, // Add this if need
});

module.exports = {
  pool,
};
