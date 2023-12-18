import dotenv from 'dotenv';
dotenv.config();

export default async () => {
  try {
    const dbCredentials = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'imdb',
    };
    // Return the credentials
    return new Response(
      { dbCredentials },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    // Return an error response
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    }); // Return the credentials
  }
};
