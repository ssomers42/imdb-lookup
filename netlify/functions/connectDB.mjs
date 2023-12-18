import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'imdb',
    });
    // Return the credentials
    return {
      statusCode: 200,
      body: JSON.stringify({ connection }),
    };
  } catch (error) {
    console.error(error);

    // Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }; // Return the credentials
  }
};
