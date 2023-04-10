require('dotenv').config();
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: 3306
});

// API routes here
app.get('/api/animals', (req, res) => {
    connection.query('SELECT * FROM animal', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data from the database');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/api/staff', (req, res) => {
    const type = req.query.type;
  
    let query;
    let table;
    if (type === 'caretaker') {
      query = 'SELECT * FROM staff_member JOIN caretaker ON staff_member.ssn = caretaker.sssn';
      table = 'caretaker';
    } else if (type === 'guide') {
      query = 'SELECT * FROM staff_member JOIN guide ON staff_member.ssn = guide.sssn';
      table = 'guide';
    } else if (type === 'janitor') {
      query = 'SELECT * FROM staff_member JOIN janitor ON staff_member.ssn = janitor.sssn';
      table = 'janitor';
    } else if (type === 'receptionist') {
      query = 'SELECT * FROM staff_member JOIN receptionist ON staff_member.ssn = receptionist.sssn';
      table = 'receptionist';
    } else {
      res.status(400).send('Invalid staff type');
      return;
    }
  
    connection.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data from the database');
      } else {
        res.json({
          table: table,
          results: results
        });
      }
    });
  });
  


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
