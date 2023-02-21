import { setLibraryState, LIBRARY_STATE, setPaginationState, setPage } from './globals';
import { createLibrary } from './create-library';

// Set the initial library state to 'watched'
setLibraryState('watched');

// Select the element that contains the library action buttons
const libraryActions = document.querySelector('.library-actions');

// Define a function that will be called when the user clicks on a library action button
function toggleActiveState(event) {
  // If the user didn't click on a button, do nothing
  if (event.target.tagName !== 'BUTTON') return;

  // Remove the active state from the currently active button
  const currentActiveButton = libraryActions.querySelector('.library-actions__button--active');
  currentActiveButton.classList.remove('library-actions__button--active');
  currentActiveButton.classList.add('library-actions__button');

  // Add the active state to the button that was clicked
  const clickedButton = event.target;
  clickedButton.classList.remove('library-actions__button');
  clickedButton.classList.add('library-actions__button--active');

  // Change the library state and create a new library based on the clicked button
  if (clickedButton.textContent === 'Watched') {
    setLibraryState('watched');
    setPaginationState('watched');
    createLibrary('watched', 1);
  } else if (clickedButton.textContent === 'Queue') {
    setLibraryState('queue');
    setPaginationState('queue');
    createLibrary('queue', 1);
  }
}

// Add an event listener to the library actions element to listen for button clicks
libraryActions.addEventListener('click', toggleActiveState);
