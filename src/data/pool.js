import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'MarVel147',
    database: 'mydb', //to rename!!!!!!!!!!!!!!!!

});

export default pool;