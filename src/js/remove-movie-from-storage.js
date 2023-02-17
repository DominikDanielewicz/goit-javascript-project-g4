import { Notify } from 'notiflix';
import { createLibrary } from './create-library';
import { PAGE, PAGINATION_STATE } from './globals';
function changeButtonText() {
  const addToWatchedButton = document.querySelector('.modal-movie__button-add-to-watched');
  const addToQueueButton = document.querySelector('.modal-movie__button-add-to-queue');

  addToWatchedButton.textContent = 'REMOVE FROM WATCHED';
  addToQueueButton.textContent = 'REMOVE FROM QUEUE';
}
changeButtonText();

const modalMovieButtons = document.querySelector('.modal-movie__buttons');

modalMovieButtons.addEventListener('click', event => {
  const button = event.target;
  const movieId = button.dataset.id;

  if (button.textContent === 'ADD TO WATCHED') {
    let watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];

    if (!watchedMovies.includes(movieId)) {
      watchedMovies.push(movieId);
      localStorage.setItem('watched', JSON.stringify(watchedMovies));
      Notify.success(`This movie has been added to watched.`);
      createLibrary(PAGINATION_STATE, PAGE);
      button.textContent = 'REMOVE FROM WATCHED';
    } else {
      Notify.info(`This movie already exists in watched.`);
    }
  } else if (button.textContent === 'ADD TO QUEUE') {
    let queuedMovies = JSON.parse(localStorage.getItem('queue')) || [];

    if (!queuedMovies.includes(movieId)) {
      queuedMovies.push(movieId);
      localStorage.setItem('queue', JSON.stringify(queuedMovies));
      Notify.success(`Movie has been added to queue.`);
      createLibrary(PAGINATION_STATE, PAGE);
      button.textContent = 'REMOVE FROM QUEUE';
    } else {
      Notify.info(`This movie already exists in queue.`);
    }
  } else if (button.textContent === 'REMOVE FROM WATCHED') {
    let watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];

    if (watchedMovies.includes(movieId)) {
      watchedMovies = watchedMovies.filter(id => id !== movieId);
      localStorage.setItem('watched', JSON.stringify(watchedMovies));
      Notify.info(`This movie has been removed from watched.`);
      createLibrary(PAGINATION_STATE, PAGE);
      button.textContent = 'ADD TO WATCHED';
    }
  } else if (button.textContent === 'REMOVE FROM QUEUE') {
    let queuedMovies = JSON.parse(localStorage.getItem('queue')) || [];

    if (queuedMovies.includes(movieId)) {
      queuedMovies = queuedMovies.filter(id => id !== movieId);
      localStorage.setItem('queue', JSON.stringify(queuedMovies));
      Notify.info(`Movie has been removed from queue.`);
      createLibrary(PAGINATION_STATE, PAGE);
      button.textContent = 'ADD TO QUEUE';
    }
  }
});
