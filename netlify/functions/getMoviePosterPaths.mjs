import dotenv from 'dotenv';
dotenv.config();

//Fetch options for TMDB API call
//Leaving API key in .env rather than server call for speed and simplicity
//TODO: come back to optimize
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

//Fetch TMDB movie poster URL paths for each movie using IMDB ID
export default async (movies) => {
  return Promise.all(
    movies.map(async (movie) => {
      try {
        const resp = await fetch(
          `https://api.themoviedb.org/3/find/${movie.tconst}?external_source=imdb_id`,
          options
        );
        const movieDetails = await resp.json();
        const moviePosterPath = movieDetails.movie_results[0].poster_path;
        return moviePosterPath;
      } catch (err) {
        console.log(err);
      }
    })
  );
};
