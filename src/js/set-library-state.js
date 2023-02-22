import { setLibraryState, setPaginationState } from './globals';
import { createLibrary } from './create-library';

// Set initial library state to 'watched'
setLibraryState('watched');

// Select element that contains library action buttons
const libraryActions = document.querySelector('.library-actions');

// Function to be called when library action button is clicked
function toggleActiveState(event) {
  // If the button wasn't clicked, return
  if (event.target.tagName !== 'BUTTON') return;

  // Remove active state from currently active button
  const currentActiveButton = libraryActions.querySelector('.library-actions__button--active');
  currentActiveButton.classList.remove('library-actions__button--active');
  currentActiveButton.classList.add('library-actions__button');

  // Add active state to the button that was clicked
  const clickedButton = event.target;
  clickedButton.classList.remove('library-actions__button');
  clickedButton.classList.add('library-actions__button--active');

  // Change library state and create a new library based on the clicked button
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

// Add event listener to library actions element
libraryActions.addEventListener('click', toggleActiveState);
