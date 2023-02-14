import { fetchMovieById } from './fetch';

const gallery = document.querySelector('.gallery__box');
const partToFill = document.querySelector('.modal-movie__wrapper');
const modalElement = document.querySelector('.modal-container');
const modalCloseElement = document.querySelector('.modal-movie__button-close');
const baseURL = 'http://image.tmdb.org/t/p/w500';

// function generating html from template with movie data
const fillMovieModalData = (id, movie) => {
  // Create a comma-separated list of genres
  const genres = movie.genres.map(genre => genre.name).join(', ');

  // Get references to all the DOM elements that we want to fill with movie data
  const modal = document.querySelector('.modal-container');
  const poster = modal.querySelector('.modal-movie__movie-poster');
  const title = modal.querySelector('.modal-movie__title');
  const voteHighlight = modal.querySelector('.stats-list__highlight');
  const voteTotal = modal.querySelector('.stats-list__vote-total');
  const popularity = modal.querySelector('.stats-list__popularity-count');
  const originalTitle = modal.querySelector('.stats-list__original-title');
  const genreList = modal.querySelector('.stats-list__genres');
  const description = modal.querySelector('.movie-description__plot');
  const watchedButton = modal.querySelector('.modal-movie__button-add-to-watched');
  const queueButton = modal.querySelector('.modal-movie__button-add-to-queue');

  // Fill the DOM elements with movie data
  poster.src = `${baseURL + movie.poster_path}`;
  title.textContent = movie.title;
  voteHighlight.textContent = movie.vote_average;
  voteTotal.innerHTML = `<span class="stats-list__highlight">${movie.vote_average}</span> / ${movie.vote_count}`;
  popularity.textContent = movie.popularity;
  originalTitle.textContent = movie.original_title;
  genreList.textContent = genres;
  description.textContent = movie.overview;
  watchedButton.dataset.id = id;
  queueButton.dataset.id = id;
};

function fillData(id) {
  fetchMovieById(id).then(movie => {
    fillMovieModalData(id, movie);
  });
}
gallery.addEventListener('click', event => {
  let target = event.target;
  while (target && !target.classList.contains('card')) {
    target = target.parentElement;
  }
  if (target) {
    const id = target.dataset.id;
    fillData(id);
    modalElement.classList.remove('hidden');
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modalElement.classList.add('hidden');
  }
});

modalCloseElement.addEventListener('click', event => {
  modalElement.classList.add('hidden');
});
