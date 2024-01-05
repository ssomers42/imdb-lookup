export const MovieListItem = ({ movie }) => {
  const baseURL = 'https://image.tmdb.org/t/p/';
  const imageSize = 'w185';
  return (
    <li key={movie.primaryTitle}>
      movie: {movie.primaryTitle}, rating: {movie.averageRating}
      <img src={baseURL + imageSize + movie.poster_path} alt="" />
    </li>
  );
};
