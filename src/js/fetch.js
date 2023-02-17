import {
  APIKEY,
  setPage,
  setTotalPages,
  setPaginationState,
  setLastQuery,
  TOTAL_PAGES,
  PAGE,
  PAGINATION_STATE,
} from './globals';
import { createButtons } from './pagination';
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

// fetches trending movie data for specified page number
// sets global PAGE numer variable
// sets global TOTAL_PAGES number variable
// sets global PAGINATION_STATE flag string to "trending"
// returns an array of objects with movie data
export async function fetchTrending(page) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}&page=${page}`);
    const data = await response.json();

    const genresResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
    const genresData = await genresResponse.json();
    const genres = genresData.genres;

    const results = data.results.map(movie => {
      const movieGenres = movie.genre_ids.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre.name;
      });
      return { ...movie, genre_ids: movieGenres };
    });
    setPage(page);
    const totalResults = data.total_results;
    const totalPages = Math.ceil(totalResults / 20); // 20 results per page
    setTotalPages(totalPages);
    setPaginationState('trending');
    createButtons(TOTAL_PAGES, PAGE);
    console.log(PAGINATION_STATE, 'page: ' + PAGE, 'total pages: ' + TOTAL_PAGES);
    return results;
  } catch (error) {
    console.error(error);
  }
}

// fetches movie data based on query and page number
// returns an array of objects with movie data based on a query
export async function fetchQuery(query, page) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${query}&page=${page}`
    );
    const data = await response.json();

    const genresResponse = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}`);
    const genresData = await genresResponse.json();
    const genres = genresData.genres;

    const results = data.results.map(movie => {
      const movieGenres = movie.genre_ids.map(genreId => {
        const genre = genres.find(g => g.id === genreId);
        return genre.name;
      });
      return { ...movie, genre_ids: movieGenres };
    });
    const totalResults = data.total_results;
    const totalPages = Math.ceil(totalResults / 20); // 20 results per page
    setPage(page);
    setTotalPages(totalPages);
    setPaginationState('search');
    setLastQuery(query);
    createButtons(TOTAL_PAGES, PAGE);
    console.log(PAGINATION_STATE, 'page: ' + PAGE, 'total pages: ' + TOTAL_PAGES);
    return results;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMoviesFromStorage(storageKey) {
  try {
    const movieIds = JSON.parse(localStorage.getItem(storageKey));
    const movies = [];

    for (const id of movieIds) {
      const movie = await fetchMovieById(id);
      movies.push(movie);
    }

    return movies;
  } catch (error) {
    console.error(error);
  }
}
