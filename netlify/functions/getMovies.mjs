import mysql from 'mysql';

export default async (req, context) => {
  const { year, genre } = context.params;

  //TODO: Add genre to stored procedure and query
  console.log(`getMovies Called with ${year}, ${genre}`);
  const connection = await connectToDB();
  // Wrap the query in a promise
  const query = await new Promise((resolve, reject) => {
    connection.query(
      'CALL GetTopTenMoviesByYearAndGenre(?, ?);',
      [year, genre],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
  console.log('query finished:', query);
  connection.end();
  return new Response(JSON.stringify(query));
};

const fetchDBCredentials = async () => {
  const dbCredentialsResponse = await fetch(
    'https://peppy-tapioca-c09f82.netlify.app/.netlify/functions/connectDB'
  );
  const dbCredentials = await dbCredentialsResponse.json();
  return dbCredentials;
};

const connectToDB = async () => {
  const dbCredentials = await fetchDBCredentials();
  const connection = mysql.createConnection(dbCredentials);
  await connection.connect();
  console.log('connected to DB');
  return connection;
};

export const config = {
  path: '/get-movies/:year/:genre',
};
