import { hideSpinner, showSpinner } from './spinner';
import { fetchMovieById } from './fetch';
import { createGallery } from './create-gallery';
import { TOTAL_PAGES, PAGE, setPage, setPaginationState, setTotalPages } from './globals';
import { createButtons } from './pagination';

// Declare variables
const galleryBox = document.querySelector('.gallery__box');
const paginationBox = document.querySelector('.pagination');

// Fetch movies from library and create gallery
export async function createLibrary(key, page) {
  // Show spinner while movies are fetched
  showSpinner();

  // Define number of movies to return per page
  const moviesPerPage = 20;

  // Set index of starting movie for this page
  const startIndex = (page - 1) * moviesPerPage;

  // Retrieve stored ID of movies from localStorage
  const movieIds = JSON.parse(localStorage.getItem(key)) || [];

  // Set total number of pages based on the length of retrieved IDs array
  const totalPages = Math.ceil(movieIds.length / moviesPerPage);

  // Get array of movie IDs to fetch
  const idsToFetch = movieIds.slice(startIndex, startIndex + moviesPerPage);

  // Fetch movies information using retrieved movie IDs
  const movies = await Promise.all(idsToFetch.map(fetchMovieById));

  // Set the pagination data
  setTotalPages(totalPages);

  // Create a visual representation of the gallery using movie data
  createGallery(
    movies.map(movie => ({
      id: movie.id, // Add the movie id here
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      genre_ids: movie.genre_ids,
      vote_average: movie.vote_average,
    }))
  );

  // Create pagination buttons based on the number of total pages
  createButtons(TOTAL_PAGES, PAGE);
  // Hide spinner after creating gallery
  hideSpinner();
}

// If current page is library page, create gallery automatically when there's an update
if (window.location.pathname.indexOf('library.html') !== -1) {
  showSpinner();
  createLibrary('watched', 1);
  setPaginationState('watched');
}
