import { setLibraryState, LIBRARY_STATE } from './globals';
// import { createMovieGalleryFromLocalStorage } from './create-library-gallery';
setLibraryState('watched');
const libraryActions = document.querySelector('.library-actions');

function toggleActiveState(event) {
  if (event.target.tagName !== 'BUTTON') return;

  const currentActiveButton = libraryActions.querySelector('.library-actions__button--active');
  currentActiveButton.classList.remove('library-actions__button--active');
  currentActiveButton.classList.add('library-actions__button');

  const clickedButton = event.target;
  clickedButton.classList.remove('library-actions__button');
  clickedButton.classList.add('library-actions__button--active');

  if (clickedButton.textContent === 'Watched') {
    setLibraryState('watched');
    console.log('library global state:', LIBRARY_STATE);
    // createMovieGalleryFromLocalStorage('watched', 1);
  } else if (clickedButton.textContent === 'Queue') {
    setLibraryState('queue');
    // createMovieGalleryFromLocalStorage('queue', 1);
    console.log('library global state:', LIBRARY_STATE);
  }
}
libraryActions.addEventListener('click', toggleActiveState);

// function toggleButtonText(button) {
//   if (button.textContent === 'ADD TO WATCHED') {
//     button.textContent = 'REMOVE FROM WATCHED';
//   } else if (button.textContent === 'REMOVE FROM WATCHED') {
//     button.textContent = 'ADD TO WATCHED';
//   } else if (button.textContent === 'ADD TO QUEUE') {
//     button.textContent = 'REMOVE FROM QUEUE';
//   } else if (button.textContent === 'REMOVE FROM QUEUE') {
//     button.textContent = 'ADD TO QUEUE';
//   }
// }

// const addToWatchedButton = document.querySelector('.modal-movie__button-add-to-watched');
// toggleButtonText(addToWatchedButton);
