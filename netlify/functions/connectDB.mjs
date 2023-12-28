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
    console.log(dbCredentials);
    const returnThis = new Response(
      { dbCredentials },
      {
        status: 200,
      }
    );
    // Return the credentials
    return returnThis;
  } catch (error) {
    console.error(error);

    // Return an error response
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    }); // Return the credentials
  }
};
