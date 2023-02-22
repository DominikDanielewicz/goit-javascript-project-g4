import { fetchQuery } from './fetch';
import { createGallery } from './create-gallery';
import throttle from 'lodash/throttle';
import { setPaginationState } from './globals';
import { Notify } from 'notiflix';
import { hideSpinner, showSpinner } from './spinner';

// Get elements from the DOM
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');
const galleryBox = document.querySelector('.gallery__box');
const paginationBox = document.querySelector('.pagination');

// Create a throttled version of the fetch function
const throttledFetch = throttle(async query => {
  // Clear pagination and gallery boxes and show the spinner
  paginationBox.innerHTML = '';
  galleryBox.innerHTML = '';
  showSpinner();

  // Fetch data for the given query and create the gallery
  const data = await fetchQuery(query, 1);
  hideSpinner();
  createGallery(data);
}, 500);

// Add a submit event listener to the search form
searchForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get the search query from the input element
  const query = searchInput.value;

  // Notify the user if the search form is empty
  if (query === '') {
    Notify.failure(`Please fill the search form first.`, {
      position: 'center-top',
    });
    return;
  }

  // Set pagination state and fetch data for the query
  setPaginationState('search');
  throttledFetch(query);
});
