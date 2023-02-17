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
  const poster = modalElement.querySelector('.modal-movie__movie-poster');
  const title = modalElement.querySelector('.modal-movie__title');
  const voteHighlight = modalElement.querySelector('.stats-list__highlight');
  const voteTotal = modalElement.querySelector('.stats-list__vote-total');
  const popularity = modalElement.querySelector('.stats-list__popularity-count');
  const originalTitle = modalElement.querySelector('.stats-list__original-title');
  const genreList = modalElement.querySelector('.stats-list__genres');
  const description = modalElement.querySelector('.movie-description__plot');
  const watchedButton = modalElement.querySelector('.modal-movie__button-add-to-watched');
  const queueButton = modalElement.querySelector('.modal-movie__button-add-to-queue');

  // Fill the DOM elements with movie data
  if (movie.poster_path) {
    poster.src = `${baseURL + movie.poster_path}`;
  } else {
    const defaultImageURL =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
    poster.src = defaultImageURL;
  }
  title.textContent = movie.title;
  voteHighlight.textContent = movie.vote_average;
  voteTotal.innerHTML = `<span class="stats-list__highlight">${movie.vote_average.toFixed(1)}</span> / ${
    movie.vote_count
  }`;
  popularity.textContent = movie.popularity;
  originalTitle.textContent = movie.original_title;
  genreList.textContent = genres;
  description.textContent = movie.overview;
  watchedButton.dataset.id = id;
  queueButton.dataset.id = id;
};

function onEscapeKeydown(event) {
  if (event.key === 'Escape') {
    modalElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscapeKeydown);
  }
}

function handleGalleryClick(event) {
  const target = event.target.closest('.card');
  if (target) {
    const id = target.dataset.id;
    fetchMovieById(id).then(movie => {
      fillMovieModalData(id, movie);
    });
    modalElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeKeydown);
    gallery.removeEventListener('click', handleGalleryClick);
  }
}

gallery.addEventListener('click', event => {
  const target = event.target.closest('.card');
  if (target) {
    const id = target.dataset.id;
    fetchMovieById(id).then(movie => {
      fillMovieModalData(id, movie);
    });
    modalElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeKeydown);
    gallery.removeEventListener('click', handleGalleryClick);
  }
});

modalCloseElement.addEventListener('click', event => {
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);
  gallery.addEventListener('click', handleGalleryClick);
});
