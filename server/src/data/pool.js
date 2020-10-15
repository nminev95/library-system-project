import mariadb from 'mariadb';
import { DB_CONFIG } from './../config.js';

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'QWErty123!',
    database: 'mydb', //to rename!!!!!!!!!!!!!!!!

});

export default pool;