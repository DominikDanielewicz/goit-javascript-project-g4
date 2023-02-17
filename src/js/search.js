import { fetchQuery } from './fetch';
import { createGallery } from './create-gallery';
import throttle from 'lodash/throttle';
import { setPaginationState } from './globals';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');

const throttledFetch = throttle(async query => {
  const data = await fetchQuery(query, 1);
  createGallery(data);
}, 500);

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInput.value;
  if (query === '') {
    Notify.failure(`Please Fill the form first.`, {
      position: 'center-top',
      backgroundColor: '#ff6b08',
      cssAnimationTextColor: '#ffffff',
    });
    return;
  }
  setPaginationState('search');
  throttledFetch(query);
});
