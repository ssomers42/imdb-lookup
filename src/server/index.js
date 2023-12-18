import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.listen(3002, () => console.log('Server started'));

// connect to db
const connection = mysql.createConnection({
  host: process.env.VITE_DB_HOST,
  user: process.env.VITE_DB_USER,
  password: process.env.VITE_DB_PASSWORD,
  database: 'imdb',
});

console.log(process.env.VITE_DB_USER);

connection.connect();

app.get('/api/getMovies/:yearInput', (req, res) => {
  const yearInput = req.params.yearInput;
  console.log(`API Called with ${yearInput}`);

  connection.query(
    'CALL GetTopTenMoviesAndCastByYear(?);',
    [yearInput],
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      console.log(fields);
    }
  );

  res.json({ message: `Year input: ${yearInput}` });
});

// connection.end();
