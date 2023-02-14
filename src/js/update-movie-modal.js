import { fetchMovieById } from './fetch';

const gallery = document.querySelector('.gallery__box');
const partToFill = document.querySelector('.modal-movie__wrapper');
const modalElement = document.querySelector('.modal-container');
const modalCloseElement = document.querySelector('.modal-movie__button-close');
const baseURL = 'http://image.tmdb.org/t/p/w500';

// function generating html from template with movie data
const fillMovieModalData = (id, movie) => {
  let getGenres = [...movie.genres].map(genre => genre.name).join(', ');
  partToFill.innerHTML = `
  <img class="modal-movie__movie-poster" src="${baseURL + movie.poster_path}" alt="#" />
  <article class="modal-movie__info">
    <h2 class="modal-movie__title">${movie.title}</h2>
    <div class="stats-list__box">
      <ul class="stats-list">
        <li>
          <p>Vote / Votes</p>
        </li>
        <li>
          <p>Popularity</p>
        </li>
        <li>
          <p>Original title</p>
        </li>
        <li>
          <p>Genre</p>
        </li>
      </ul>
      <ul class="stats-list__values">
        <li>
          <p><span class="stats-list__highlight">${movie.vote_average}</span> / ${movie.vote_count}</p>
        </li>
        <li>
          <p>${movie.popularity}</p>
        </li>
        <li>
          <p>${movie.original_title}</p>
        </li>
        <li>
          <p>${getGenres}</p>
        </li>
      </ul>
    </div>
    <div class="movie-description">
      <h3 class="movie-description__heading">ABOUT</h3>
      <p class="movie-description__plot">
        ${movie.overview}
      </p>
    </div>
    <div class="modal-movie__buttons">
      <button class="modal-movie__button-add-to-watched" data-id="${id}">ADD TO WATCHED</button>
      <button class="modal-movie__button-add-to-queue" data-id="${id}">ADD TO QUEUE</button>
    </div>
  </article>
  `;
};

function fillData(id) {
  fetchMovieById(id).then(movie => {
    fillMovieModalData(id, movie);
  });
}
gallery.addEventListener('click', event => {
  let target = event.target;
  while (target && !target.classList.contains('card')) {
    target = target.parentElement;
  }
  if (target) {
    const id = target.dataset.id;
    fillData(id);
    modalElement.classList.remove('hidden');
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    modalElement.classList.add('hidden');
  }
});

modalCloseElement.addEventListener('click', event => {
  modalElement.classList.add('hidden');
});
