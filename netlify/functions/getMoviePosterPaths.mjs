import dotenv from 'dotenv';
dotenv.config();

//Fetch options for TMDB API call
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

//Fetch TMDB movie poster URL paths for each movie using IMDB ID
export default async (event, req, context) => {
  console.log('fetching movie paths');

  const movies = event.queryStringParameters.movies;
  console.log('movies', movies);
  // const moviesJSON = event.queryStringParameters.movies;
  // console.log(moviesJSON);

  // //decode and parse movies object from params
  // const movies = JSON.parse(decodeURIComponent(moviesJSON));
  // console.log(movies);
  // return Promise.all(
  //   movies.map(async (movie) => {
  //     try {
  //       const resp = await fetch(
  //         `https://api.themoviedb.org/3/find/${movie.tconst}?external_source=imdb_id`,
  //         options
  //       );
  //       const movieDetails = await resp.json();
  //       const moviePosterPath = movieDetails.movie_results[0].poster_path;
  //       return moviePosterPath;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })
  // );
};

// object example: [ { "tconst": "tt15398776", "primaryTitle": "Oppenheimer", "titleType": "movie", "averageRating": 8.4 }, { "tconst": "tt1517268", "primaryTitle": "Barbie", "titleType": "movie", "averageRating": 7 }, { "tconst": "tt6791350", "primaryTitle": "Guardians of the Galaxy Vol. 3", "titleType": "movie", "averageRating": 7.9 }, { "tconst": "tt9362722", "primaryTitle": "Spider-Man: Across the Spider-Verse", "titleType": "movie", "averageRating": 8.7 }, { "tconst": "tt10366206", "primaryTitle": "John Wick: Chapter 4", "titleType": "movie", "averageRating": 7.7 }, { "tconst": "tt10954600", "primaryTitle": "Ant-Man and the Wasp: Quantumania", "titleType": "movie", "averageRating": 6.1 }, { "tconst": "tt6718170", "primaryTitle": "The Super Mario Bros. Movie", "titleType": "movie", "averageRating": 7.1 }, { "tconst": "tt2906216", "primaryTitle": "Dungeons & Dragons: Honor Among Thieves", "titleType": "movie", "averageRating": 7.3 }, { "tconst": "tt9603212", "primaryTitle": "Mission: Impossible - Dead Reckoning Part One", "titleType": "movie", "averageRating": 7.8 }, { "tconst": "tt0439572", "primaryTitle": "The Flash", "titleType": "movie", "averageRating": 6.7 } ]

// event NetlifyRequest [Request] {
//   [Symbol(realm)]: {
//     settingsObject: { baseUrl: undefined, origin: [Getter], policyContainer: [Object] }
//   },
//   [Symbol(state)]: {
//     method: 'GET',
//     localURLsOnly: false,
//     unsafeRequest: false,
//     body: null,
//     client: { baseUrl: undefined, origin: [Getter], policyContainer: [Object] },
//     reservedClient: null,
//     replacesClientId: '',
//     window: 'client',
//     keepalive: false,
//     serviceWorkers: 'all',
//     initiator: '',
//     destination: '',
//     priority: null,
//     origin: 'client',
//     policyContainer: 'client',
//     referrer: 'client',
//     referrerPolicy: '',
//     mode: 'cors',
//     useCORSPreflightFlag: false,
//     credentials: 'same-origin',
//     useCredentials: false,
//     cache: 'default',
//     redirect: 'follow',
//     integrity: '',
//     cryptoGraphicsNonceMetadata: '',
//     parserMetadata: '',
//     reloadNavigation: false,
//     historyNavigation: false,
//     userActivation: false,
//     taintedOrigin: false,
//     redirectCount: 0,
//     responseTainting: 'basic',
//     preventNoCacheCacheControlHeaderModification: false,
//     done: false,
//     timingAllowFailed: false,
//     headersList: HeadersList {
//       cookies: null,
//       [Symbol(headers map)]: [Map],
//       [Symbol(headers map sorted)]: null
//     },
//     urlList: [ URL {} ],
//     url: URL {
//       href: 'http://localhost:8888/.netlify/functions/getMoviePosterPaths?movies=%5B%7B%22tconst%22%3A%22tt15398776%22%2C%22primaryTitle%22%3A%22Oppenheimer%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A8.4%7D%2C%7B%22tconst%22%3A%22tt1517268%22%2C%22primaryTitle%22%3A%22Barbie%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7%7D%2C%7B%22tconst%22%3A%22tt6791350%22%2C%22primaryTitle%22%3A%22Guardians+of+the+Galaxy+Vol.+3%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.9%7D%2C%7B%22tconst%22%3A%22tt9362722%22%2C%22primaryTitle%22%3A%22Spider-Man%3A+Across+the+Spider-Verse%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A8.7%7D%2C%7B%22tconst%22%3A%22tt10366206%22%2C%22primaryTitle%22%3A%22John+Wick%3A+Chapter+4%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.7%7D%2C%7B%22tconst%22%3A%22tt10954600%22%2C%22primaryTitle%22%3A%22Ant-Man+and+the+Wasp%3A+Quantumania%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A6.1%7D%2C%7B%22tconst%22%3A%22tt6718170%22%2C%22primaryTitle%22%3A%22The+Super+Mario+Bros.+Movie%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.1%7D%2C%7B%22tconst%22%3A%22tt2906216%22%2C%22primaryTitle%22%3A%22Dungeons+%26+Dragons%3A+Honor+Among+Thieves%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.3%7D%2C%7B%22tconst%22%3A%22tt9603212%22%2C%22primaryTitle%22%3A%22Mission%3A+Impossible+-+Dead+Reckoning+Part+One%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.8%7D%2C%7B%22tconst%22%3A%22tt0439572%22%2C%22primaryTitle%22%3A%22The+Flash%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A6.7%7D%5D',
//       origin: 'http://localhost:8888',
//       protocol: 'http:',
//       username: '',
//       password: '',
//       host: 'localhost:8888',
//       hostname: 'localhost',
//       port: '8888',
//       pathname: '/.netlify/functions/getMoviePosterPaths',
//       search: '?movies=%5B%7B%22tconst%22%3A%22tt15398776%22%2C%22primaryTitle%22%3A%22Oppenheimer%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A8.4%7D%2C%7B%22tconst%22%3A%22tt1517268%22%2C%22primaryTitle%22%3A%22Barbie%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7%7D%2C%7B%22tconst%22%3A%22tt6791350%22%2C%22primaryTitle%22%3A%22Guardians+of+the+Galaxy+Vol.+3%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.9%7D%2C%7B%22tconst%22%3A%22tt9362722%22%2C%22primaryTitle%22%3A%22Spider-Man%3A+Across+the+Spider-Verse%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A8.7%7D%2C%7B%22tconst%22%3A%22tt10366206%22%2C%22primaryTitle%22%3A%22John+Wick%3A+Chapter+4%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.7%7D%2C%7B%22tconst%22%3A%22tt10954600%22%2C%22primaryTitle%22%3A%22Ant-Man+and+the+Wasp%3A+Quantumania%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A6.1%7D%2C%7B%22tconst%22%3A%22tt6718170%22%2C%22primaryTitle%22%3A%22The+Super+Mario+Bros.+Movie%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.1%7D%2C%7B%22tconst%22%3A%22tt2906216%22%2C%22primaryTitle%22%3A%22Dungeons+%26+Dragons%3A+Honor+Among+Thieves%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.3%7D%2C%7B%22tconst%22%3A%22tt9603212%22%2C%22primaryTitle%22%3A%22Mission%3A+Impossible+-+Dead+Reckoning+Part+One%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A7.8%7D%2C%7B%22tconst%22%3A%22tt0439572%22%2C%22primaryTitle%22%3A%22The+Flash%22%2C%22titleType%22%3A%22movie%22%2C%22averageRating%22%3A6.7%7D%5D',
//       searchParams: URLSearchParams {
//         'movies' => '[{"tconst":"tt15398776","primaryTitle":"Oppenheimer","titleType":"movie","averageRating":8.4},{"tconst":"tt1517268","primaryTitle":"Barbie","titleType":"movie","averageRating":7},{"tconst":"tt6791350","primaryTitle":"Guardians of the Galaxy Vol. 3","titleType":"movie","averageRating":7.9},{"tconst":"tt9362722","primaryTitle":"Spider-Man: Across the Spider-Verse","titleType":"movie","averageRating":8.7},{"tconst":"tt10366206","primaryTitle":"John Wick: Chapter 4","titleType":"movie","averageRating":7.7},{"tconst":"tt10954600","primaryTitle":"Ant-Man and the Wasp: Quantumania","titleType":"movie","averageRating":6.1},{"tconst":"tt6718170","primaryTitle":"The Super Mario Bros. Movie","titleType":"movie","averageRating":7.1},{"tconst":"tt2906216","primaryTitle":"Dungeons & Dragons: Honor Among Thieves","titleType":"movie","averageRating":7.3},{"tconst":"tt9603212","primaryTitle":"Mission: Impossible - Dead Reckoning Part One","titleType":"movie","averageRating":7.8},{"tconst":"tt0439572","primaryTitle":"The Flash","titleType":"movie","averageRating":6.7}]' },
//       hash: ''
//     }
//   },
//   [Symbol(signal)]: AbortSignal { aborted: false },
//   [Symbol(headers)]: HeadersList {
//     cookies: null,
//     [Symbol(headers map)]: Map(20) {
//       'accept' => [Object],
//       'accept-encoding' => [Object],
//       'accept-language' => [Object],
//       'client-ip' => [Object],
//       'connection' => [Object],
//       'host' => [Object],
//       'referer' => [Object],
//       'sec-ch-ua' => [Object],
//       'sec-ch-ua-mobile' => [Object],
//       'sec-ch-ua-platform' => [Object],
//       'sec-fetch-dest' => [Object],
//       'sec-fetch-mode' => [Object],
//       'sec-fetch-site' => [Object],
//       'user-agent' => [Object],
//       'x-forwarded-for' => [Object],
//       'x-nf-account-id' => [Object],
//       'x-nf-client-connection-ip' => [Object],
//       'x-nf-geo' => [Object],
//       'x-nf-request-id' => [Object],
//       'x-nf-site-id' => [Object]
//     },
//     [Symbol(headers map sorted)]: null
//   }
// }
