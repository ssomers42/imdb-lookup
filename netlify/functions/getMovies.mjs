export default async (event) => {
  const connection = await fetch('/.netlify/functions/connectDB');
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
