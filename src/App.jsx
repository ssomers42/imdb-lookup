import { useState, useEffect, useRef } from 'react';

function App() {
  const [year, setYear] = useState();
  const [movies, setMovies] = useState();
  const inputRef = useRef();

  let moviesList;
  if (movies) {
    moviesList = movies.map((movie) => (
      <li key={movie.primaryTitle}>movie: {movie.primaryTitle}, votes: {movie.numVotes} </li>
    ));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(inputRef.current.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesRes = await fetch(`/get-movies/${year}`);
        const moviesData = await moviesRes.json();
        console.log(moviesData);
        setMovies(moviesData[0]);
      } catch (err) {
        console.log('Error fetching movies', err);
      }
    };
    if (year != undefined) {
      fetchMovies();
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
      {movies && <ul>{moviesList}</ul>}
    </>
  );
}

export default App;
