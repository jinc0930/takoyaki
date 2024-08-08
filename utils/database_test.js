const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) {
        return console.error(err.message);
    }
});

// CREATE
// sql = `CREATE TABLE users(id INTEGER PRIMARY KEY, first_name, last_name, username, password, email)`;
// db.run(sql);

// DROP
// db.run("DROP TABLE users");

// INSERT DATA
// sql = `INSERT INTO users(first_name,last_name, username, password, email) VALUES (?,?,?,?,?)`;
// db.run(sql, ['chang', 'jin', 'chang_user','test','jinc0930@gmail.com'], (err) =>{
//     if (err) return console.error(err.message);
// });

