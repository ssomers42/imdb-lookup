import dotenv from 'dotenv';
dotenv.config();

export default (req, context) => {
  try {
    const dbCredentials = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'imdb',
    };
    return new Response(JSON.stringify(dbCredentials), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('whoops', error);

    // Return an error response
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    }); // Return the credentials
  }
};
