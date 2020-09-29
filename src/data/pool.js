import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    database: 'librarydb', //to rename!!!!!!!!!!!!!!!!

});

export default pool;