import dotenv from 'dotenv';
dotenv.config();

//Fetch options for TMDB API call
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

//Fetch TMDB movie poster URL paths for each movie using IMDB ID
export default async (event, context) => {
  console.log('fetching movie paths');

  //Split query params since event.queryStringParameters is broken??
  const moviesQuery = event.url.split('=')[1];

  //decode and parse movies object from params
  const movies = JSON.parse(decodeURIComponent(moviesQuery));
  console.log(movies);

  //Fetch movie poster URL for each movie
  const moviePosterLinks = await Promise.all(
    movies.map(async (movie) => {
      try {
        //Get all movie info
        const resp = await fetch(
          `https://api.themoviedb.org/3/find/${movie.tconst}?external_source=imdb_id`,
          options
        );
        const movieDetails = await resp.json();
        //Return only the poster_path
        const moviePosterPath = movieDetails.movie_results[0].poster_path;
        return moviePosterPath;
      } catch (err) {
        console.log(err);
      }
    })
  );

  //Return the poster URLs for each movie
  return new Response(JSON.stringify(moviePosterLinks), {
    status: 500,
  });
};
