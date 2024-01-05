import { MovieListItem } from './MovieListItem';

export const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie, ind) => (
        <MovieListItem key={ind} movie={movie} />
      ))}
    </ul>
  );
};
