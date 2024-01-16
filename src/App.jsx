/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { MovieList } from './MovieList';
import { getMovies } from './getMovies';

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
    const getMoviesAsync = async () => {
      const movies = await getMovies(year);
      setMovies(movies);
    };
    //Get movies and related posters then store in state
    if (year != undefined) {
      getMoviesAsync();
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
