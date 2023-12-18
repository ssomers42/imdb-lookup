import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

// connect to db
export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'imdb',
});

connection.connect();
