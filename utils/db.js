const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.KUCINGKU_HOST,
    user: process.env.KUCINGKU_USER,
    password: process.env.KUCINGKU_PASSWORD,
    database: 'kucingku_db'
});


connection.connect((err) => {
    if(err){
        console.error('Error connecting to CLoud SQL:', err);
        return;
    }
    console.log('Connected to Cloud SQL');
});

module.exports = connection;