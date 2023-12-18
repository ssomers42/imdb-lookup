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
    return new Response(JSON.stringify({ connection }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    // Return an error response
    return Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    }); // Return the credentials
  }
};
