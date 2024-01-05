/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { MovieList } from './MovieList';

function App() {
  const [year, setYear] = useState();
  const [movies, setMovies] = useState();
  const inputRef = useRef();

  //Set year on submit to trigger getMovies()
  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(inputRef.current.value);
  };

  useEffect(() => {
    //TODO: Move to own file
    const getMovies = async () => {
      try {
        //Get top ten movies from DB for year input
        const resp = await fetch(`/get-movies/${year}`);
        const moviesData = await resp.json();
        const movies = moviesData[0];

        //Get poster URLs from TMDB
        const moviePosterPaths = await getMoviePosterPaths(movies);

        //Append poster URLs to top ten movies data and return new object
        const moviesWithPaths = movies.map((movie, index) => {
          return { ...movie, poster_path: moviePosterPaths[index] };
        });

        setMovies(moviesWithPaths);
      } catch (err) {
        console.log('Error fetching movies', err);
      }
    };

    //Fetch options for TMDB API call
    //Leaving API key in .env rather than server call for speed and simplicity
    //TODO: come back to optimize
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.TMDB_API_KEY}`,
      },
    };

    //Fetch TMDB movie poster URL paths for each movie using IMDB ID
    //TODO: Move to own file along with options
    const getMoviePosterPaths = async (movies) => {
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

    //Get movies and related posters then store in state
    if (year != undefined) {
      getMovies();
    } else console.log('year undefined');
  }, [year]);

  return (
    <>
      {year && <h1>Hello World, it's the year {year}</h1>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="yearInput">Enter a year</label>
        <input
          type="number"
          name="yearInput"
          id="yearInput"
          min={1920}
          max={2023}
          ref={inputRef}
        />
        <button type="submit">SEARCH</button>
      </form>
      {movies && <MovieList movies={movies} />}
    </>
  );
}

export default App;
