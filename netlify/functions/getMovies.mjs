import mysql from 'mysql';

export default async (event) => {
  const dbCredentials = await fetch(
    'https://peppy-tapioca-c09f82.netlify.app/.netlify/functions/connectDB'
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('data: ', data);
      console.log('dbCredentials: ', data.dbCredentials);
      return data.dbCredentials;
    });

  const connection = mysql.createConnection(dbCredentials);
  await connection.connect();

  const { yearInput } = event.queryStringParameters;
  console.log(`API Called with ${yearInput}`);

  await connection.query(
    'CALL GetTopTenMoviesAndCastByYear(?);',
    [yearInput],
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      console.log(fields);
    }
  );
  connection.end();
};

export const config = {
  path: '/get-movies/:yearInput',
};
