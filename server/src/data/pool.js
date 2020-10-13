import mariadb from 'mariadb';
import { DB_CONFIG } from './../config.js';

<<<<<<< HEAD:server/src/data/pool.js
const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'QWErty123!',
    database: 'mydb', //to rename!!!!!!!!!!!!!!!!

});
=======
const pool = mariadb.createPool(DB_CONFIG);
>>>>>>> c4c50fd2e0247bcb8214362caa9883f2f6be41bc:src/data/pool.js

export default pool;