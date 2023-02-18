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
import { createGallery } from './create-gallery';
import { Notify } from 'notiflix';
import { createGallery } from './create-gallery';
// Function to call the API by movie ID and get a reponse with details
// returns an object with details - genres are already resolved
// id parameter needs to be a string
const paginationBox = document.querySelector('.pagination');
export async function fetchMovieById(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`);
    const data = await response.json();

    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}`);
    const creditsData = await creditsResponse.json();
    const genres = data.genres;

    const movieGenres = genres && Array.isArray(genres) ? genres.map(genre => genre.name) : [];
    return { ...data, genre_ids: movieGenres };
  } catch (error) {
    console.error(error);
  }
}

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
    createButtons(TOTAL_PAGES, PAGE);
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
    if (totalResults < 1) {
      Notify.failure(`Sorry, no movie found matching your search`, {
        position: 'center-top',
      });
      fetchTrending(1).then(data => {
        createGallery(data);
      });
    }
    const totalPages = Math.ceil(totalResults / 20); // 20 results per page
    setPage(page);
    setTotalPages(totalPages);
    setLastQuery(query);
    createButtons(TOTAL_PAGES, PAGE);
    return results;
  } catch (error) {
    console.error(error);
  }
}
