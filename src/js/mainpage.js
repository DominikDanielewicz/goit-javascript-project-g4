const filmsGalery = document.querySelector('.gallery__box');

// Zmieniam coś na potrzeby

const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
let page = 1;
let pages;

const { log } = console;

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

// call the function
trandingFilms();

// This function creates elements in .gallery_box

const createFilmsGalery = elem => {
  elem.map(async film => {
    log('im film', film);
    let name = film.title;
    let poster = film.poster_path;
    let filmId = film.id;
    let releseDate = film.release_date.slice(0, 4);

    // Because i can't get the genres name from first fetch
    // i created second fetch from API that use film id to get films details and then i extract genres name from it
    let genres = await getGenres(film.id);

    const galeryItem = `<figure class="card" data-id="${filmId}">
<img class="card__image" src="https://image.tmdb.org/t/p/original${poster}" alt="${name} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${name}</p>
  <p class="card__description">${genres}, Other | ${releseDate}</p>
</figcaption>
</figure>`;

    filmsGalery.innerHTML = filmsGalery.innerHTML + galeryItem;
  });
};

// function that use film id from createFilmsGalery function.
// This function creates details of tranding films but is used for creating genres name.
// !!! Can be used for modal window after small changes !!!
const getGenres = async id => {
  link = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`;
  let gen;
  await fetchFilms(link).then(res => {
    log(res.genres);
    gen = res.genres
      .slice(0, 2)
      .map(ele => ele.name)
      .join(', ');
  });
  return gen;
};
