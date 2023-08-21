const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 3001;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access1.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(bodyParser.json());  // Parses JSON payloads

const db = mysql.createConnection({
  host: '192.168.0.10',
  user: 'test1',
  password: 'test1',
  database: 'OrderDetails'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/getData1', (req, res) => {
  const query = 'SELECT * FROM unchecked';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/getData2', (req, res) => {
    const query = 'SELECT * FROM inprogress';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

app.get('/getData3', (req, res) => {
    const query = 'SELECT * FROM completed';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});


app.post('/moveToInProgress/:id', (req, res) => {
    const { id } = req.params;
    
    // Start a new transaction
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error starting transaction' });
      }
  
      db.query('SELECT * FROM unchecked WHERE id = ?', [id], (err, results) => {
        if (err) {
            return db.rollback(() => {
                res.status(500).json({ success: false, message: 'Error selecting data' });
            });
        }
    
        const data = results[0];
        
        // Exclude ID from data before inserting
        const { id: _, ...dataWithoutId } = data;
  
        // Insert the data into inprogress
        db.query('INSERT INTO inprogress SET ?', dataWithoutId, (err, insertResults) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ success: false, message: 'Error inserting data to inprogress' });
            });
          }
  
          // Delete the original data from unchecked
          db.query('DELETE FROM unchecked WHERE id = ?', [id], (err, deleteResults) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ success: false, message: 'Error deleting data from unchecked' });
              });
            }
  
            // Commit the transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ success: false, message: 'Error committing transaction' });
                });
              }
              res.json({ success: true, message: 'Data moved to inprogress successfully!' });
            });
          });
        });
      });
    });
  });

  app.post('/moveToCompleted/:id', (req, res) => {
    const { id } = req.params;
    
    // Start a new transaction
    db.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error starting transaction' });
      }
  
      db.query('SELECT * FROM inprogress WHERE id = ?', [id], (err, results) => {
        if (err) {
            return db.rollback(() => {
                res.status(500).json({ success: false, message: 'Error selecting data' });
            });
        }
    
        const data = results[0];
        
        // Exclude ID from data before inserting
        const { id: _, ...dataWithoutId } = data;
  
        // Insert the data into inprogress
        db.query('INSERT INTO completed SET ?', dataWithoutId, (err, insertResults) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ success: false, message: 'Error inserting data to Completed' });
            });
          }
  
          // Delete the original data from unchecked
          db.query('DELETE FROM unchecked WHERE id = ?', [id], (err, deleteResults) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ success: false, message: 'Error deleting data from InProgress' });
              });
            }
  
            // Commit the transaction
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  res.status(500).json({ success: false, message: 'Error committing transaction' });
                });
              }
              res.json({ success: true, message: 'Data moved to completed successfully!' });
            });
          });
        });
      });
    });
  });

  
 
  // DELETE endpoint to remove data from unchecked table by ID
  app.delete('/deleteData1/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM unchecked WHERE id = ?';
    db.query(query, [id], (err) => {
      if (err) throw err;
      res.json({ success: true, message: 'Data from unchecked deleted!' });
    });
  });
  
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

app.listen(3001, '0.0.0.0', function() {
    console.log('Listening on port 3001');
});
