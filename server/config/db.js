const mysql = require('mysql');

// Create connection

const db = mysql.createConnection({  
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
});

  db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connection to mysql succesful')
  });

  module.exports = db;