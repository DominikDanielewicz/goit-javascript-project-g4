import { hideSpinner, showSpinner } from './spinner';
import { fetchMovieById } from './fetch';
import { createGallery } from './create-gallery';
import { TOTAL_PAGES, PAGE, setPage, setPaginationState, setTotalPages } from './globals';
import { createButtons } from './pagination';
const galleryBox = document.querySelector('.gallery__box');
const paginationBox = document.querySelector('.pagination');
export async function createLibrary(key, page) {
  showSpinner();
  const moviesPerPage = 20;
  const startIndex = (page - 1) * moviesPerPage;

  const movieIds = JSON.parse(localStorage.getItem(key)) || [];

  const totalPages = Math.ceil(movieIds.length / moviesPerPage);

  const idsToFetch = movieIds.slice(startIndex, startIndex + moviesPerPage);

  const movies = await Promise.all(idsToFetch.map(fetchMovieById));
  setTotalPages(totalPages);

  createGallery(
    movies.map(movie => ({
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
      vote_average: movie.vote_average,
    }))
  );

  createButtons(TOTAL_PAGES, PAGE);
  hideSpinner();
}

if (window.location.pathname.indexOf('library.html') !== -1) {
  showSpinner();
  createLibrary('watched', 1);
  setPaginationState('watched');
}
