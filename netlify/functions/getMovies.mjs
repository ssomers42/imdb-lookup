export default async (event) => {
  const connection = await fetch('/.netlify/functions/connectDB');

  console.log(connection);

  const { yearInput } = event.queryStringParameters;

  await connection.query(
    'CALL GetTopTenMoviesAndCastByYear(?);',
    [yearInput],
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows);
      console.log(fields);
    }
  );
  return console.log(`API Called with ${yearInput}`);
};

export const config = {
  path: '/get-movies/:yearInput',
};
