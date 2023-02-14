export { getMovieWatched, renderMovies, printMovie };

import { APIKEY } from './mainpage';

const btnGet = document.querySelector('.library-actions__button--active');
const filmsGallery = document.querySelector('.gallery__library');
const btnWatched = document.querySelector('.library-actions__button--active');
const btnQueue = document.querySelector('.library-actions__button');
const KEY_WATCHED = 'watched-movies';

let idMovies = [];
let key = null;

const getMovieWatched = key => {
  try {
    const film = localStorage.getItem(key);
    console.log((idMovies = film === null ? undefined : JSON.parse(film)));
    return (idMovies = film === null ? undefined : JSON.parse(film));
  } catch (error) {
    console.log(error.message);
  }
};
async function fetchById(id) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`);
    if (!response.ok) {
      throw new Error(response.status);
    } else {
      return await response.json();
    }
  } catch (err) {
    return console.log(err);
  }
}

function renderMovies() {
  filmsGallery.innerHTML = '';
  getMovieWatched(key);

  idMovies.forEach(filmId => {
    fetchById(filmId).then(({ id, poster_path, original_title, release_date, genres }) => {
      let getGenres = [...genres].map(genre => genre.name).join(', ');
      let relaseYear = release_date.substring(0, 4);
      filmsGallery.innerHTML += `
<figure class="card" data-id="${id}">
<img class="card__image" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${original_title}</p>
  <p class="card__description">${getGenres}, Other | ${relaseYear}</p>
</figcaption>
</figure>`;
    });
  });
}

function printMovie() {
  key = KEY_WATCHED;
  renderMovies();
}
printMovie();

btnGet.addEventListener('click', () => {
  key = KEY_WATCHED;
  renderMovies();
  // btnWatched.classList.add('is-chosen');
  // btnQueue.classList.remove('is-chosen');
});
