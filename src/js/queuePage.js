'use strict';

import { fetchMovieById } from './fetch';
import { createButtons, paginationList } from './globals';

let queueStorage = JSON.parse(localStorage.getItem('queue'));

let page = 1;
const paginationLimit = 3;
const totalPages = Math.ceil(queueStorage.length / paginationLimit);
const filmGalery = document.querySelector('.gallery__box');
const paginationList = document.querySelector('.pagination');
paginationList.addEventListener('click', chceckBttn);

function chceckBttn(e) {
  const prev = document.querySelector('.pagination__button--arrow-left');
  const next = document.querySelector('.pagination__button--arrow-right');

  if (e.target === prev) {
    page--;
  }
  if (e.target === next) {
    page++;
  }
  if (e.target.type === 'button') {
    page = Number(e.target.dataset.page);
  }
  setCurrentPage(page, queueStorage);
}

function setCurrentPage(pageNum, storage) {
  page = pageNum;
  removeCurrentMovies();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  storage.forEach((id, index) => {
    if (index >= prevRange && index < currRange) {
      fetchMovieById(id)
        .then(movie => {
          createQueueGalery(movie);
        })
        .catch(error => console.log('Error occured!', error));
    }
  });
  createButtons(totalPages, page);
}

setCurrentPage(page, queueStorage);

function createQueueGalery(movie) {
  const filmsGallery = document.querySelector('.gallery__box');
  const { id, poster_path, original_title } = movie;
  const genres = movie.genres.map(genre => genre.name);
  const release_date = movie.release_date.slice(0, 4) || 'Sorry. No relase date yet.';

  if (genres.length > 2) {
    newGenres = genres.slice(0, 2).join(', ');
    other = ', Other';
  } else if (genres.length <= 2 && genres.length > 1) {
    newGenres = genres;
    other = '';
    if (genres.length === 2) {
      newGenres = genres.join(', ');
      other = '';
    }
  } else {
    newGenres = 'Sorry. No genre added yet.';
    other = '';
  }

  const galleryItem = `<figure class="card" data-id="${id}">
    <img class="card__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${original_title} movie poster" />
    <figcaption class="card__caption">
      <p class="card__title">${original_title}</p>
      <p class="card__description">${newGenres + other} | ${release_date}</p>
    </figcaption>
    </figure>`;

  filmsGallery.innerHTML += galleryItem;
}

function removeCurrentMovies() {
  filmGalery.innerHTML = '';
}
