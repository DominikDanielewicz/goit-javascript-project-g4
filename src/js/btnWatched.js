export { getMovieWatched, renderMovie, printMovie };
// console.log('Hello buttonWatched');

import { getGenres } from './mainpage';

//test
// localStorage.setItem('data', JSON.stringify(data));
// const retrieveData = JSON.parse(localStorage.getItem('data'));
// console.log(retrieveData);

const btnGet = document.querySelector('.library-actions__button--active');
const filmsGallery = document.querySelector('.gallery__library');

const KEY_WATCHED = 'watchedMovies';

// /TEST with setLocalStorage
let watchedMovies = [];

const getMovieWatched = () => {
  try {
    const film = JSON.parse(localStorage.getItem(KEY_WATCHED));
    if (film) {
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
};

function renderMovie() {
  filmsGallery.innerHTML = '';
  getFilmWatched();
  watchedMovies.forEach(filmId => {
    getGenres(filmId).then(({ id, poster_path, original_title, release_date, genres }) => {
      let getGenres = [...genres].map(genre => genre.name).join(', ');
      let relaseYear = release_date.substring(0, 4);

      const galleryItem = `<figure class="card" data-id="${id}">
<img class="card__image" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${original_title} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${original_title}</p>
  <p class="card__description">${getGenres}, Other | ${relaseYear}</p>
</figcaption>
</figure>`;
      filmsGallery.innerHTML = filmsGallery.innerHTML + galleryItem;
    });
  });
}

const printMovie = () => {
  console.log(getMovieWatched());
};

btnGet.addEventListener('click', printMovie, () => {
  renderMovie();
});
