import { fetchMovieById } from './fetch';
import {
  addMovieToWatched,
  addMovieToQueue,
  removeMovieFromWatched,
  removeMovieFromQueue,
} from './handle-local-storage';
import { createLibrary } from './create-library';
import { LIBRARY_STATE, setPaginationState } from './globals';
import { showSpinner, hideSpinner, showSpinnerModal, hideSpinnerModal } from './spinner';

// Select elements from the DOM
const gallery = document.querySelector('.gallery__box'); // The gallery container
const partToFill = document.querySelector('.modal-movie__wrapper'); // The container for the movie modal
const modalElement = document.querySelector('.modal-container'); // The modal container
const modalCloseElement = document.querySelector('.modal-movie__button-close'); // The close button for the modal
const modalImage = modalElement.querySelector('.modal-movie__movie-poster'); // The image element for the movie poster
const baseURL = 'http://image.tmdb.org/t/p/w500'; // The base URL for the TMDB API image URLs

// Function to fill the movie modal with data
const fillMovieModalData = (id, movie, imageUrl) => {
  const genres = movie.genres.map(genre => genre.name).join(', '); // Join the movie genres into a string

  // Select the elements in the modal to update with movie data
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

  // Update the poster image URL and text content for other elements
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

  hideSpinnerModal(); // Hide the spinner element
};

// Find the "watched" and "queue" buttons in the DOM
const watchedButton = document.querySelector('.modal-movie__button-add-to-watched');
const queueButton = document.querySelector('.modal-movie__button-add-to-queue');

// Returns true if the movie with the given id is in the "watched" array in local storage
const isMovieInWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  return watched.includes(id);
};

// Returns true if the movie with the given id is in the "queue" array in local storage
const isMovieInQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  return queue.includes(id);
};

// Toggles the text of a button between four different states
function toggleButtonText(button) {
  // Four states: "ADD TO WATCHED", "REMOVE FROM WATCHED", "ADD TO QUEUE", "REMOVE FROM QUEUE"
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

// Add a click event listener to the "watched" button, and update the library and pagination state as needed
watchedButton.addEventListener('click', function () {
  if (isMovieInWatched(getButtonMovieId(watchedButton))) {
    removeMovieFromWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  } else {
    addMovieToWatched(getButtonMovieId(watchedButton));
    toggleButtonText(watchedButton);
  }

  // Update the library and pagination state if the user is on the library page and viewing the "watched" list
  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'watched') {
    createLibrary('watched', 1);
    setPaginationState('watched');
  }
});

// Add a click event listener to the "queue" button, and update the library and pagination state as needed
queueButton.addEventListener('click', function () {
  if (isMovieInQueue(getButtonMovieId(queueButton))) {
    removeMovieFromQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  } else {
    addMovieToQueue(getButtonMovieId(queueButton));
    toggleButtonText(queueButton);
  }

  // Update the library and pagination state if the user is on the library page and viewing the "queue" list
  if (window.location.pathname.indexOf('library.html') !== -1 && LIBRARY_STATE === 'queue') {
    createLibrary('queue', 1);
    setPaginationState('queue');
  }
});

// Get the value of the "data-id" attribute of a button element
const getButtonMovieId = button => {
  return button.dataset.id;
};

// Handles keydown events for the escape key, hiding the modal and removing the event listener
function onEscapeKeydown(event) {
  if (event.key === 'Escape') {
    hideSpinnerModal();
    modalElement.classList.add('hidden');
    document.removeEventListener('keydown', onEscapeKeydown);
  }
}

// This function handles the click event on the gallery
function handleGalleryClick(event) {
  // Find the closest ancestor element with the class 'card'
  const target = event.target.closest('.card');
  if (target) {
    // Get the unique identifier of the clicked card
    const id = target.dataset.id;

    // Get the URL of the clicked image
    const posterUrl = target.querySelector('.card__image').getAttribute('src');
    // Set the poster URL as the source of the modal image
    modalImage.setAttribute('src', posterUrl);

    // Fetch additional movie data using the unique identifier
    fetchMovieById(id).then(movie => {
      // Populate the movie modal with fetched data
      fillMovieModalData(id, movie, posterUrl);
    });

    // Display the modal
    modalElement.classList.remove('hidden');
    // Listen for the Escape key to close the modal
    document.addEventListener('keydown', onEscapeKeydown);
    // Remove the event listener for gallery clicks to prevent further clicks during modal display
    gallery.removeEventListener('click', handleGalleryClick);
  }
}

// Add a click event listener to the gallery element
gallery.addEventListener('click', event => {
  // Find the closest parent element with the class 'card' from the clicked element
  const target = event.target.closest('.card');

  // If a 'card' element was found, get its ID and poster URL, and update the movie modal with its data
  if (target) {
    const id = target.dataset.id;
    const posterUrl = target.querySelector('.card__image').getAttribute('src');
    modalImage.setAttribute('src', posterUrl);
    fetchMovieById(id).then(movie => {
      fillMovieModalData(id, movie, posterUrl);

      // Update the text of the watched and queue buttons based on whether the movie is already in the respective list
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

    // Show the movie modal and add a keydown event listener for the Escape key
    modalElement.classList.remove('hidden');
    document.addEventListener('keydown', onEscapeKeydown);

    // Remove the click event listener from the gallery element to prevent further clicks
    gallery.removeEventListener('click', handleGalleryClick);
  }
});

// Add a click event listener to the close button of the movie modal
modalCloseElement.addEventListener('click', event => {
  // Hide the spinner, hide the movie modal, and remove the keydown event listener for the Escape key
  hideSpinnerModal();
  modalElement.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);

  // Add back the click event listener to the gallery element to allow further clicks
  gallery.addEventListener('click', handleGalleryClick);
});
