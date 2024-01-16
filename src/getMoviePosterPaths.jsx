//Fetch TMDB movie poster URL paths for each movie using IMDB ID
export const getMoviePosterPaths = async (movies) => {
  const moviesQuery = encodeURIComponent(JSON.stringify(movies));
  const getPathsURL = `https://peppy-tapioca-c09f82.netlify.app/.netlify/functions/getMoviePosterPaths?movies=${moviesQuery}`;

  try {
    console.log('getting paths');
    const resp = await fetch(getPathsURL);
    return resp;
  } catch (err) {
    console.log(err);
  }
};
