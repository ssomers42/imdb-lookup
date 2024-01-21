/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { MovieList } from './MovieList';
import { getMovies } from './getMovies';
import { SelectDropdown } from './SelectDrodown';

function App() {
  const [year, setYear] = useState();
  const [genre, setGenre] = useState(null);
  const [movies, setMovies] = useState();
  const yearRef = useRef(null);
  const genreRef = useRef(null);

  //Set year and genre on submit to trigger getMovies()
  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(yearRef.current.value);
    genreRef.current.value === 'Any'
      ? setGenre(null)
      : setGenre(genreRef.current.value);
  };

  useEffect(() => {
    const getMoviesAsync = async () => {
      const movies = await getMovies(year, genre);
      setMovies(movies);
    };
    //Get movies and related posters then store in state
    if (year != undefined) {
      getMoviesAsync();
    } else console.log('year undefined');
  }, [year, genre]);

  return (
    <>
      {year ? (
        <h1>Searching for movies from the year {year}</h1>
      ) : (
        <h1>Enter a year and genre to get the top 10 movies</h1>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="yearInput">Enter a year</label>
        <input
          type="number"
          name="yearInput"
          id="yearInput"
          min={1920}
          max={2023}
          ref={yearRef}
        />
        <SelectDropdown genreRef={genreRef} />
        <button type="submit">SEARCH</button>
      </form>
      {movies && <MovieList movies={movies} />}
    </>
  );
}

export default App;
