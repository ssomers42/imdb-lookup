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
        const moviesWithPaths = await movies.map((movie, index) => {
          return { ...movie, poster_path: moviePosterPaths[index] };
        });

        setMovies(moviesWithPaths);
      } catch (err) {
        console.log('Error fetching movies', err);
      }
    };

    //Fetch TMDB movie poster URL paths for each movie using IMDB ID
    const getMoviePosterPaths = async (movies) => {
      const moviesQuery = encodeURIComponent(JSON.stringify(movies));
      const getPathsURL = `http://localhost:8888/.netlify/functions/getMoviePosterPaths?movies=${moviesQuery}`;

      try {
        console.log('getting paths');
        const resp = await fetch(getPathsURL);
        return resp;
      } catch (err) {
        console.log(err);
      }
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
