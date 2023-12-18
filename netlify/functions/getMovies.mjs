export default async (event) => {
  const connection = await fetch(
    'https://peppy-tapioca-c09f82.netlify.app/.netlify/functions/connectDB'
  )
    .then((res) => res.json())
    .then((data) => {
      console.log('connection: ', data.connection);
      console.log(data);
      return data.connection;
    });
  await connection.connect();

  console.log(connection);

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
