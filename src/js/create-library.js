import { fetchMovieById } from './fetch';
import { createGallery } from './create-gallery';
import { PAGE_LIBRARY, TOTAL_PAGES, PAGE, setPage, setPaginationState, setTotalPages } from './globals';
import { createButtons } from './pagination';
export async function createLibrary(key, page) {
  const moviesPerPage = 20;
  const startIndex = (page - 1) * moviesPerPage;

  const movieIds = JSON.parse(localStorage.getItem(key)) || [];

  const totalPages = Math.ceil(movieIds.length / moviesPerPage);

  const idsToFetch = movieIds.slice(startIndex, startIndex + moviesPerPage);

  const movies = await Promise.all(idsToFetch.map(fetchMovieById));
  setTotalPages(totalPages);
  createGallery(movies);
  createButtons(TOTAL_PAGES, PAGE);
}

if (window.location.pathname.indexOf('library.html') !== -1) {
  createLibrary('watched', 1);
  setPaginationState('watched');
}
