const filmsGalery = document.querySelector('.gallery__box');

// Zmieniam coś na potrzeby

const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
let page = 1;
let pages;

const { log } = console;

const galeryItem = `<figure class="card">
<img class="card__image" src="#" alt="card template" />
<figcaption class="card__caption">
  <p class="card__title">card title</p>
  <p class="card__description">card | description</p>
</figcaption>
</figure>`;

// Fetch films from API

const fetchFilms = link => {
  return fetch(link)
    .then(res => {
      return res.json();
    })
    .catch(error => log(error));
};

// Main function that loads tranding film on main page
const trandingFilms = () => {
  link = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}&page=${page}`;

  fetchFilms(link).then(res => {
    pages = res.total_pages;
    let films = res.results;

    createFilmsGalery(films);
  });
};
trandingFilms();

// This function creates elements in .gallery_box

const createFilmsGalery = elem => {
  elem.map(async film => {
    log('im film', film);
    let name = film.title;
    let poster = film.poster_path;
    // Because i cant get the genres name from first fetch, i created second fetch from API that use film id to get films details and then i extract genres name
    let id = await getGenres(film.id);

    log('im name', name, 'im poster', poster, 'im id', id);
    // let genres =
  });
};

// function that use film id from createFilmsGalery function. This function creates details of tranding films
const getGenres = async id => {
  link = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`;
  let gen;
  await fetchFilm(link).then(res => {});
};
