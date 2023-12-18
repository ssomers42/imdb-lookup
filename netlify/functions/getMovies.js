import connection from './connectDB';

export const getMovies = async (event) => {
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
};
