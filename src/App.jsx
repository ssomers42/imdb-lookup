import { useState, useEffect, useRef } from 'react';

function App() {
  const [year, setYear] = useState();
  const [movies, setMovies] = useState();
  const inputRef = useRef();

  //TODO: Create separate movie card component
  let moviesList;
  if (movies) {
    moviesList = movies.map((movie) => (
      <li key={movie.primaryTitle}>
        movie: {movie.primaryTitle}, votes: {movie.numVotes}
        <img src="" alt="" />
      </li>
    ));
  }

  //TODO:  Iterate through movies and make API call for each

  useEffect(() => {}, [movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(inputRef.current.value);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const resp = await fetch(`/get-movies/${year}`);
        const moviesData = await resp.json();
        const movies = moviesData[0];
        console.log('movies', movies);
        const moviePosterPaths = await getMoviePosterPaths(movies);
        console.log('paths', moviePosterPaths);
        //TODO: add poster path to each movie
      } catch (err) {
        console.log('Error fetching movies', err);
      }
    };

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzRlNDNmNjcwMzM0MTUxNjQwZGEzMzAwNDg0ZThlYSIsInN1YiI6IjY1OTYzYjI5MzI2ZWMxMzQ2ZDA2YzE4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vXxgnVpjGjyhy7MfdQAfJ5gwjDuInrocMCFPVgDSUtU',
      },
    };
    //Fetch TMDB movie poster URL paths using IMDB ID
    const getMoviePosterPaths = async (movies) => {
      return Promise.all(
        movies.map(async (movie) => {
          const resp = await fetch(
            `https://api.themoviedb.org/3/find/${movie.tconst}?external_source=imdb_id`,
            options
          );
          const movieDetails = await resp.json();
          const moviePosterPath = movieDetails.movie_results[0].poster_path;
          return moviePosterPath;
        })
      );
    };

    //get movies and related posters then store in state
    if (year != undefined) {
      const movies = getMovies();
      console.log('movies', movies);
      // setMovies();
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
