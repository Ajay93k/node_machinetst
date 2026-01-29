const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'nodeuser',
  password: 'node123',      
  database: 'machine_test'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;