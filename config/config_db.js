const db = require('mysql2/promise');

const dbConnection = db.createPool({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'departamentos',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
});

dbConnection.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = dbConnection;