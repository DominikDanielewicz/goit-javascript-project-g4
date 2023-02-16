'use strict';
import { APIKEY, createButtons, paginationList } from './globals';
import { hideSpinner, showSpinner } from './spinner';
const filmGalery = document.querySelector('.gallery__box');

let page = 1;
let totalPages;
let link;
let filmsOnPage;

const { log } = console;

// Fetch films from API

export const fetchFilms = link => {
  showSpinner();
  return fetch(link)
    .then(res => {
      hideSpinner();
      return res.json();
    })
    .catch(error => log(error));
};

// This function uses the film id to get the details of that film
// Can be used to make a modal with film details
export const getFilmDetails = async id => {
  link = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`;

  return await fetchFilms(link).then(res => {
    return res;
  });
};

// Main function that loads tranding film on main page
export const trendingFilms = () => {
  link = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}&page=${page}`;

  return fetchFilms(link).then(res => {
    totalPages = res.total_pages;
    filmsOnPage = res.results;

    createfilmGalery(filmsOnPage);
    createButtons(totalPages, page);
    paginationList.dataset.search = 'trending';
    paginationList.addEventListener('click', chceckBttn);
  });
};

// call the function
trendingFilms();

// This function creates elements in .gallery_box
// It can be used in other parts of the website,
// but the html element definded by variable "filmGalery" -const filmGalery = document.querySelector('.gallery__box') must be there

export const createfilmGalery = elem => {
  filmGalery.innerHTML = '';
  elem.map(async film => {
    let name = film.title;
    let poster = film.poster_path;
    let filmId = film.id;
    let releseDate = film.release_date.slice(0, 4) || 'Sorry. No relase date yet.';
    let other;
    let newGenres;
    // Because i can't get the genres names from first fetch
    // i created second fetch from API that uses film id to get films details and then i extract genres names from it
    let genres = await getFilmDetails(film.id).then(res => res.genres.map(elem => elem.name));

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

    const galeryItem = `<figure class="card" data-id="${filmId}">
<img class="card__image" src="https://image.tmdb.org/t/p/w500${poster}" alt="${name} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${name}</p>
  <p class="card__description">${newGenres + other} | ${releseDate}</p>
</figcaption>
</figure>`;

    filmGalery.innerHTML = filmGalery.innerHTML + galeryItem;
  });
};

const chceckBttn = e => {
  const prev = document.querySelector('.pagination__button--arrow-left');
  const next = document.querySelector('.pagination__button--arrow-right');

  if (paginationList.dataset.search === 'search') {
    return;
  } else {
    if (e.target === prev) {
      page--;
      trendingFilms();
    }
    if (e.target === next) {
      page++;
      trendingFilms();
    }
    if (e.target.type === 'button') {
      page = Number(e.target.dataset.page);
      trendingFilms();
    }
  }
};