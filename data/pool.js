import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'QWErty123!',
    database: 'mydb',
});

export default pool;