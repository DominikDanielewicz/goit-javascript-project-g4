import { showModal } from './movie-details-modal';
import { fetchMovieById } from './fetch';

const gallery = document.querySelector('.gallery__box');
const template = document.querySelector('#film-template');
const baseURL = 'http://image.tmdb.org/t/p/';

// fukcja renderująca kartę filmu w oknie modalnym - umieszczenie danych w szablonie
const renderMovieDetails = (id, movie) => {
  console.log(movie);
  let getGenres = [...movie.genres].map(genre => genre.name).join(', ');
  template.innerHTML = `
 <section class="backdrop">
    <section class="movie-details-modal data-id="${id}"">
      <article class="movie-details-modal__img" src="${baseURL}${movie.poster_path}" alt="${movie.original_title}">
        </article>
           <article class="movie-details-modal__info">
            <h2>${movie.original_title}</h2>
              <article class="movie-details-modal__list">
               <ul class="list__headings">
                    <li> Vote / Votes ${movie.vote_average}/${movie.vote_count} </li>
                    <li>Popularity ${movie.popularity}</li>
                    <li>Original Title${movie.original_title}</li>
                    <li>Genre${getGenres}</li>
                </ul>
                 <ul class="list__data">
        <li>
          <button type="button" class="list__btn">${movie.vote_average}</button>
          <span class="list__headings"> / </span>
          <button type="button" class="list__btn">${movie.vote_count}</button>
        </li>

      </ul>

  </article>
            <h3>ABOUT</h3>
            <p>${movie.overview}</p>

       <article class="movie-details-modal__btn-container">
            <button data-btn="watched" data-id="${id}" type="submit" class="btn-container__watched " id="add-watched">
                ADD TO WATCHED
            </button>
            <button data-btn="queue" data-id="${id}" type="submit" class="btn-container__queue" id="add-queue">
                ADD TO QUEUE
            </button>
            </article>
              </article>
        </section>
    </section>

  `;
  showModal();
};

function movieDetails(id) {
  fetchMovieById(id).then(movie => {
    renderMovieDetails(id, movie);
    console.log(movie);
  });
}
gallery.addEventListener('click', event => {
  let target = event.target;
  while (target && !target.classList.contains('card')) {
    target = target.parentElement;
  }
  if (target) {
    const id = target.dataset.id;
    console.log(id);
    movieDetails(id);
  }
});

export { renderMovieDetails };
