import { fetchMovieById } from './fetch';
import {
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
} from './handle-local-storage';
import { createLibrary } from './create-library';
import { LIBRARY_STATE, setPaginationState } from './globals';
import { hideSpinnerModal } from './spinner';

// Select elements from the DOM
const gallery = document.querySelector('.gallery__box');
const modalElement = document.querySelector('.modal-container');
const modalCloseElement = document.querySelector('.modal-movie__button-close');
const modalImage = modalElement.querySelector('.modal-movie__movie-poster');

// Fill modal with data
const fillMovieModalData = (id, movie, imageUrl) => {
  const genres = movie.genres.map(genre => genre.name).join(', ');

  // Select elements in the modal to update with movie data
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

  // Update poster image URL and text content for other elements
  poster.src = imageUrl;
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

  hideSpinnerModal();
};

// Find "watched" and "queue" buttons in the DOM
const watchedButton = document.querySelector('.modal-movie__button-add-to-watched');
const queueButton = document.querySelector('.modal-movie__button-add-to-queue');

// Return true if movie with given ID is in "watched" array in local storage
const isMovieInWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  return watched.includes(id);
};

// Return true if movie with given ID is in  "queue" array in local storage
const isMovieInQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  return queue.includes(id);
};

// Toggle button text between four states
function toggleButtonText(button) {
  // Four possible states: "ADD TO WATCHED", "REMOVE FROM WATCHED", "ADD TO QUEUE", "REMOVE FROM QUEUE"
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

// Add click event listener to the "watched" button, and update library and pagination state as needed
watchedButton.addEventListener('click', function () {
  if (isMovieInWatched(getButtonMovieId(watchedButton))) {
    removeMovieFromWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  } else {
    addMovieToWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  }

  // Update library and pagination state if the user is on the library page && viewing the "watched" list
  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'watched') {
    createLibrary('watched', 1);
    setPaginationState('watched');
  }
});

// Add click event listener to the "queue" button and update the library and pagination state as needed
queueButton.addEventListener('click', function () {
  if (isMovieInQueue(getButtonMovieId(queueButton))) {
    removeMovieFromQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  } else {
    addMovieToQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  }

  // Update library and pagination state if the user is on the library page && viewing the "queue" list
  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'queue') {
    createLibrary('queue', 1);
    setPaginationState('queue');
  }
});

// Get value of button "data-id" attribute
const getButtonMovieId = button => {
  return button.dataset.id;
};

// Handle ESCAPE keydown event
function onEscapeKeydown(event) {
  if (event.key === 'Escape') {
    hideSpinnerModal();
    modalElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscapeKeydown);
  }
}

// Handle the click event on the gallery
function handleGalleryClick(event) {
  // Find closest ancestor element with class 'card'
  const target = event.target.closest('.card');
  if (target) {
    // Get unique ID of clicked card
    const id = target.dataset.id;

    // Get URL of clicked image
    const posterUrl = target.querySelector('.card__image').getAttribute('src');

    // Set poster URL as the source of the modal image
    modalImage.setAttribute('src', posterUrl);

    // Fetch extra movie data using unique ID
    fetchMovieById(id).then(movie => {
      // Populate modal with fetched data
      fillMovieModalData(id, movie, posterUrl);
    });

    // Show modal
    modalElement.classList.remove('hidden');

    // Add ESCAPE keydown event

    document.addEventListener('keydown', onEscapeKeydown);

    // Remove event listener for gallery clicks to prevent further clicks during modal display
    gallery.removeEventListener('click', handleGalleryClick);
  }
}

// Add click event listener to gallery element
gallery.addEventListener('click', event => {
  // Find closest parent element with class 'card' from clicked element
  const target = event.target.closest('.card');

  // If a 'card' element was found, get its ID and poster URL and update modal with data
  if (target) {
    const id = target.dataset.id;
    const posterUrl = target.querySelector('.card__image').getAttribute('src');
    modalImage.setAttribute('src', posterUrl);
    fetchMovieById(id).then(movie => {
      fillMovieModalData(id, movie, posterUrl);

      // Update the watched and queue buttons text based on whether the movie is already on the respective list
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

    // Show modal and add ESCAPE keydown event
    modalElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeKeydown);

    // Remove click event listener from gallery element to prevent further clicks
    gallery.removeEventListener('click', handleGalleryClick);
  }
});

// Add click event listener to the modal close button
modalCloseElement.addEventListener('click', event => {
  // Hide spinner and modal and remove keydown event listener
  hideSpinnerModal();
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);

  // Add click event listener again to gallery element to allow further clicks
  gallery.addEventListener('click', handleGalleryClick);
});
