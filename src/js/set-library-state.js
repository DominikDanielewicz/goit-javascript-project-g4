import { setLibraryState, LIBRARY_STATE, setPaginationState, setPage } from './globals';
import { createLibrary } from './create-library';
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
    setPaginationState('watched');
    console.log('library global state:', LIBRARY_STATE);
    createLibrary('watched', 1);
  } else if (clickedButton.textContent === 'Queue') {
    setLibraryState('queue');
    setPaginationState('queue');
    createLibrary('queue', 1);
    console.log('library global state:', LIBRARY_STATE);
  }
}
libraryActions.addEventListener('click', toggleActiveState);
