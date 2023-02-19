import { fetchMovieById } from './fetch';
import {
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
} from './handle-local-storage';
import { createLibrary } from './create-library';
import { LIBRARY_STATE, setPaginationState } from './globals';

const gallery = document.querySelector('.gallery__box');
const partToFill = document.querySelector('.modal-movie__wrapper');
const modalElement = document.querySelector('.modal-container');
const modalCloseElement = document.querySelector('.modal-movie__button-close');
const baseURL = 'http://image.tmdb.org/t/p/w500';

const fillMovieModalData = (id, movie) => {
  const genres = movie.genres.map(genre => genre.name).join(', ');

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

const watchedButton = document.querySelector('.modal-movie__button-add-to-watched');
const queueButton = document.querySelector('.modal-movie__button-add-to-queue');

const isMovieInWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  return watched.includes(id);
};
const isMovieInQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  return queue.includes(id);
};

function toggleButtonText(button) {
  if (button.innerText === 'ADD TO WATCHED') {
    button.innerText = 'REMOVE FROM WATCHED';
  } else if (button.innerText === 'REMOVE FROM WATCHED') {
    button.innerText = 'ADD TO WATCHED';
  } else if (button.innerText === 'ADD TO QUEUE') {
    button.innerText = 'REMOVE FROM QUEUE';
  } else {
    button.innerText = 'ADD TO QUEUE';
  }
}

watchedButton.addEventListener('click', function () {
  if (isMovieInWatched(getButtonMovieId(watchedButton))) {
    removeMovieFromWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  } else {
    addMovieToWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  }

  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'watched') {
    createLibrary('watched', 1);
    setPaginationState('watched');
  }
});

queueButton.addEventListener('click', function () {
  if (isMovieInQueue(getButtonMovieId(queueButton))) {
    removeMovieFromQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  } else {
    addMovieToQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  }

  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'queue') {
    createLibrary('queue', 1);
    setPaginationState('queue');
  }
});

const getButtonMovieId = button => {
  return button.dataset.id;
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
      if (isMovieInWatched(getButtonMovieId(watchedButton))) {
        watchedButton.innerHTML = 'REMOVE FROM WATCHED';
      } else {
        watchedButton.innerHTML = 'ADD TO WATCHED';
      }
      if (isMovieInQueue(getButtonMovieId(watchedButton))) {
        queueButton.innerHTML = 'REMOVE FROM QUEUE';
      } else {
        queueButton.innerHTML = 'ADD TO QUEUE';
      }
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
