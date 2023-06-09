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
app.use(express.json());


const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: 3306
});

// API routes here

//Login

app.post('/api/login', (req, res) => {
  const { email, ssn } = req.body;

  if (!email || !ssn) {
    return res.status(400).send('Email and SSN are required');
  }

  const query = 'SELECT * FROM staff_member WHERE email = ? AND ssn = ?';
  connection.query(query, [email, ssn], async (err, results) => {
    if (err) {
      res.status(500).send('Error querying the database');
    } else if (results.length > 0) {
      const user = results[0];

      // Check if the user is a receptionist
      const receptionistQuery = 'SELECT * FROM receptionist WHERE sssn = ?';
      connection.query(receptionistQuery, [ssn], (err, receptionistResults) => {
        if (err) {
          res.status(401).send('Invalid email or SSN');
        } else {
          const isReceptionist = receptionistResults.length > 0;
          res.status(200).json({ message: 'User validated', isReceptionist });
        }
      });
    } else {
      res.status(401).send('Invalid email or SSN');
    }
  });
});



//Animals
app.get('/api/animals', (req, res) => {
    connection.query('SELECT * FROM animal', (err, results) => {
      if (err) {
        res.status(500).send('Error retrieving data from the database');
      } else {
        res.json(results);
      }
    });
  });

  //Staff
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

// API routes for tickets page
app.get('/api/tickets', (req, res) => {
  const query = `
    SELECT 
      t.tid,
      t.price,
      t.type,
      DATE_FORMAT(t.date_of_issuing, \'%Y-%m-%d\') AS date_of_issuing,
      g.sssn AS guide_ssn, gsm.first_name AS guide_first_name, gsm.last_name AS guide_last_name,
      r.sssn AS receptionist_ssn, rsm.first_name AS receptionist_first_name, rsm.last_name AS receptionist_last_name
    FROM ticket AS t
    JOIN guide AS g ON t.guide_ssn = g.sssn
    JOIN staff_member AS gsm ON g.sssn = gsm.ssn
    JOIN receptionist AS r ON t.recep_ssn = r.sssn
    JOIN staff_member AS rsm ON r.sssn = rsm.ssn
    ORDER BY date_of_issuing ASC;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/receptionist/login', (req, res) => {
  const { ssn, email } = req.body;
  const query = `
    SELECT * FROM staff_member AS sm
    JOIN receptionist AS r ON sm.ssn = r.sssn
    WHERE sm.ssn = ? AND sm.email = ?;
  `;

  connection.query(query, [ssn, email], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).send('Invalid SSN or email');
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/api/receptionist/:ssn/tickets', (req, res) => {
  const { ssn } = req.params;
  const query = `
    SELECT t.*, r.first_name AS receptionist_first_name, r.last_name AS receptionist_last_name, g.first_name AS guide_first_name, g.last_name AS guide_last_name
    FROM ticket t
    JOIN staff_member r ON t.recep_ssn = r.ssn
    JOIN staff_member g ON t.guide_ssn = g.ssn
    WHERE t.recep_ssn = ?;
  `;

  connection.query(query, [ssn], (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/receptionist/:ssn/tickets', (req, res) => {
  const { ssn } = req.params;
  const ticketData = req.body;
  const query = `
    INSERT INTO ticket (tid, price, type, date_of_issuing, recep_ssn, guide_ssn)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    query,
    [ticketData.tid, ticketData.price, ticketData.type, ticketData.date_of_issuing, ssn, ticketData.guide_ssn],
    (err, results) => {
      if (err) {
        res.status(500).send('Error issuing ticket');
      } else {
        res.status(201).send('Ticket issued successfully');
      }
    }
  );
});

app.delete('/api/tickets/:tid', (req, res) => {
  const { tid } = req.params;
  const query = `
    DELETE FROM ticket
    WHERE tid = ?;
  `;

  connection.query(query, [tid], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting ticket');
    } else if (results.affectedRows === 0) {
      res.status(404).send(`Ticket with ID ${tid} not found`);
    } else {
      res.status(204).send();
    }
  });
});

//Get events
app.get('/api/events', (req, res) => {
  connection.query('SELECT e.name, DATE_FORMAT(e.date, \'%Y-%m-%d\') AS date, e.location, CONCAT(sm.first_name, " ", sm.last_name) AS event_manager_name FROM event e JOIN staff_member sm ON e.event_manager_ssn = sm.ssn ORDER BY date DESC'
  , (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving data from the database');
    } else {
      const events = results.map(event => {
        const currentDate = new Date();
        const eventDate = new Date(event.date);
        const hasPassed = eventDate < currentDate;
        return {
          name: event.name,
          date: event.date,
          location: event.location,
          event_manager: event.event_manager_name,
          has_passed: hasPassed,
          can_attend: !hasPassed // assuming anyone can attend any event
        }
      });
      res.json(events);
    }
  });
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
