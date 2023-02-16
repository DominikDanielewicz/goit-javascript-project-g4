import { fetchTrending, fetchQuery } from './fetch';

const basePosterUrl = 'https://image.tmdb.org/t/p/w500';
const noPosterImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
export async function createHomeGallery(data) {
  const galleryBox = document.querySelector('.gallery__box');
  let cards = '';

  data.forEach(movie => {
    let movieGenres = 'Unknown';
    if (movie.genre_ids && movie.genre_ids.length) {
      if (movie.genre_ids.length > 2) {
        movieGenres = movie.genre_ids.slice(0, 2).join(', ') + ', Other';
      } else {
        movieGenres = movie.genre_ids.join(', ');
      }
    }

    const year = movie.release_date.slice(0, 4);

    let title = movie.title;
    if (title.length > 35) {
      const lastSpaceIndex = title.lastIndexOf(' ', 32);
      title = title.slice(0, lastSpaceIndex) + '...';
    }
    let moviePoster = '';
    if (movie.poster_path) {
      moviePoster = `<img class="card__image" src="${basePosterUrl + movie.poster_path}" alt="${movie.title}" />`;
    } else {
      moviePoster = `<img class="card__image" src="${noPosterImage}" alt="${movie.title}" />`;
    }

    cards += `
    <figure class="card" data-movie-id="${movie.id}">
      ${moviePoster}
      <figcaption class="card__caption">
        <p class="card__title">${title}</p>
        <p class="card__description">${movieGenres} | ${year}</p>
      </figcaption>
    </figure>
  `;
  });

  galleryBox.innerHTML = cards;
}

if (window.location.pathname.indexOf('index.html') !== -1) {
  fetchTrending(1).then(data => {
    createHomeGallery(data);
  });
}

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const query = searchInput.value;
  const data = await fetchQuery(query, 1);
  console.log('found data', data);
  createHomeGallery(data);
});
