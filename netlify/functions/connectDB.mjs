import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
  // connect to db
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'imdb',
  });
  return new Response(connection);
};
