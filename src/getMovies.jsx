import { getMoviePosterPaths } from './getMoviePosterPaths.jsx';

export const getMovies = async (year) => {
  try {
    //Get top ten movies from DB for year input
    const resp = await fetch(
      `https://peppy-tapioca-c09f82.netlify.app/get-movies/${year}`
    );
    const moviesData = await resp.json();
    const movies = moviesData[0];

    //Get poster URLs from TMDB
    const moviePosterPathsResp = await getMoviePosterPaths(movies);
    const moviePosterPaths = await moviePosterPathsResp.json();

    //Append poster URLs to top ten movies data and return new object
    const moviesWithPaths = await movies.map((movie, index) => {
      return { ...movie, poster_path: moviePosterPaths[index] };
    });

    return moviesWithPaths;
  } catch (err) {
    console.log('Error fetching movies', err);
  }
};
