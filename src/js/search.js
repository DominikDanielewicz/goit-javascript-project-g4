const movieGallery = document.querySelector('.gallery__box');
const searchBox = document.querySelector('.search-form__input');
import { APIKEY } from './mainpage';
var _ = require('lodash');

function getFilms() {
  let query = searchBox.value;
  fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${APIKEY}&query=${query}`)
    .then(response => response.json())
    .then(json => console.log(json));
}

async function renderFilms() {
  const films = await getFilms();
  let markup = films
    .map(film => {
      `<figure class="card" data-id="${film.id}">
<img class="card__image" src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${
        film.original_title
      } movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${film.original_title}</p>
  <p class="card__description">${'newGenres + other'} | ${'releseDate'}</p>
</figcaption>
</figure>`;
    })
    .join('');
  movieGallery.innerHTML = markup;
}

searchBox.addEventListener(
  'input',
  _.debounce(() => {
    getFilms();
  }, 500)
);
