const movieGallery = document.querySelector('.gallery__box');
const searchBox = document.querySelector('.search-form__input');
import { APIKEY } from './mainpage';
var _ = require('lodash');

function getFilms() {
  movieGallery.innerHTML = ' ';
  let query = searchBox.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&&query=${query}`)
    .then(response => response.json())
    .then(json => json.results)
    .then(results => {
      results
        .forEach(result => {
          fetch(`https://api.themoviedb.org/3/movie/${result.id}?api_key=${APIKEY}`)
            .then(result => result.json())
            .then(result => {
              genres = result.genres.map(genre => genre.name);
              if (result.genres.length > 2) {
                genres = genres.slice(0, 2).join(', ') + ', Other';
              } else if (result.genres.length < 1) {
                genres = 'Sorry. No genre added yet.';
              } else {
                genres = genres.join(', ');
              }
              let releaseDate = result.release_date.slice(0, 4) || 'Sorry. No relase date yet.';
              let title = result.original_title;
              if (title.length > 35) {
                console.log(title);
                const lastSpaceIndex = title.lastIndexOf(' ', 32);
                title = title.slice(0, lastSpaceIndex) + '...';
              }
              let poster = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
              if (result.poster_path == null) {
                poster =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
              }
              let markup = `<figure class="card" data-id="${result.id}">
<img class="card__image" src="${poster}" alt="${title} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${title}</p>
  <p class="card__description">${genres} | ${releaseDate}</p>
</figcaption>
</figure>`;

              movieGallery.insertAdjacentHTML('afterbegin', markup);
            });
        })
        .catch(error => console.log(error));
    });
}

searchBox.addEventListener(
  'input',
  _.debounce(() => {
    getFilms();
  }, 700)
);
