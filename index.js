const express = require('express');
const mysql = require('mysql');
const faker = require('faker-br');

const app = express();

const connection = mysql.createConnection({
    host: 'mysql-db',
    user: 'root',
    password: 'password',
    database: 'test'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }

    console.log('Connected to database successfully!');
});

app.get('/', (req, res) => {

    connection.query(`INSERT INTO test.people (name) VALUES('${faker.name.findName()}')`);
    connection.query('SELECT * FROM people', (error, results) => {
        if (error) {
            console.error('Error fetching data from database:', error);
            res.send('<h1>Full Cycle Rocks!</h1>');
            return;
        }
        console.log(`${results}`)
        let names = '<ul>';

        results.forEach((person) => {
            names += `<li>${person.name}</li>`;
        });

        names += '</ul>';

        res.send(`<h1>Full Cycle Rocks!</h1>${names}`);
    });
});

app.listen(3000, () => {
    console.log('Node.js app listening on port 3000!');
});
