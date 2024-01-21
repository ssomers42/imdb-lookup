import { getMoviePosterPaths } from '../netlify/functions/getMoviePosterPaths.jsx';

export const getMovies = async (year, genre) => {
  try {
    //Get top ten movies from DB for year input
    const resp = await fetch(`/get-movies/${year}/${genre}`);
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
