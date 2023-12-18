import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export default async () => {
  // connect to db
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'imdb',
  });

  await connection.connect();

  return new Response(connection);
};
