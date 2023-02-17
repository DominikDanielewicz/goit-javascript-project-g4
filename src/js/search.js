import { fetchQuery } from './fetch';
import { createGallery } from './create-gallery';
import throttle from 'lodash/throttle';
import { setPaginationState } from './globals';
import { Notify } from 'notiflix';
import { hideSpinner, showSpinner } from './spinner';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');
const galleryBox = document.querySelector('.gallery__box');
const paginationBox = document.querySelector('.pagination');

const throttledFetch = throttle(async query => {
  paginationBox.innerHTML = '';
  galleryBox.innerHTML = '';
  showSpinner();
  const data = await fetchQuery(query, 1);
  hideSpinner();
  createGallery(data);
}, 500);

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value;
  if (query === '') {
    Notify.failure(`Please fill the search form first.`, {
      position: 'center-top',
    });
    return;
  }
  setPaginationState('search');
  throttledFetch(query);
});
