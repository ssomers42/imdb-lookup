import mysql from 'mysql';

export default async (req, context) => {
  const { inputYear } = context.params;
  console.log(`getMovies Called with ${inputYear}`);
  const connection = await connectToDB();
  // Wrap the query in a promise
  const query = await new Promise((resolve, reject) => {
    connection.query(
      'CALL GetTopTenMoviesByYear(?);',
      [inputYear],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(rows);
          resolve(rows);
        }
      }
    );
  });
  connection.end();
  console.log(query);
  return new Response(JSON.stringify(query));
};

const fetchDBCredentials = async () => {
  const dbCredentialsResponse = await fetch(
    'http://localhost:8888/.netlify/functions/connectDB'
  );
  const dbCredentials = await dbCredentialsResponse.json();
  console.log('fetched dbCredentials: ', dbCredentials);
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
  path: '/get-movies/:inputYear',
};
