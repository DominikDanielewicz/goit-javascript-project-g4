import { APIKEY } from './globals';
// Function to call the API by movie ID and get a reponse with details
// returns an object with details - genres are already resolved
// id parameter needs to be a string

export async function fetchMovieById(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`);
    const data = await response.json();

    const genresResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
    const genresData = await genresResponse.json();
    const genres = genresData.genres;

    const movieGenres =
      data.genre_ids && Array.isArray(data.genre_ids)
        ? data.genre_ids.map(genreId => {
            const genre = genres.find(g => g.id === genreId);
            return genre.name;
          })
        : [];
    return { ...data, genre_ids: movieGenres };
  } catch (error) {
    console.error(error);
  }
}

// example ussage:
// fetchMovieById("1027159").then(data => {
//   console.log(data);
// });
