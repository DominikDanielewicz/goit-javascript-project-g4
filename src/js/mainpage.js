import { closeModal, showModal } from './movie-details-modal';
const filmsGalery = document.querySelector('.gallery__box');
const paginationList = document.querySelector('.pagination');

const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
let page = 1;
let totalPages;

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
const trendingFilms = () => {
  link = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}&page=${page}`;

  fetchFilms(link).then(res => {
    totalPages = res.total_pages;
    let films = res.results;

    createFilmsGalery(films);
    createButtons(totalPages, page);
  });
};

// call the function
trendingFilms();

// This function creates elements in .gallery_box

const createFilmsGalery = elem => {
  filmsGalery.innerHTML = '';
  elem.map(async film => {
    let name = film.title;
    let poster = film.poster_path;
    let filmId = film.id;
    let releseDate = film.release_date.slice(0, 4);

    // Because i can't get the genres names from first fetch
    // i created second fetch from API that uses film id to get films details and then i extract genres names from it
    let genres = await getGenres(film.id);

    const galeryItem = `<figure class="card" data-id="${filmId}">
<img class="card__image" src="https://image.tmdb.org/t/p/w500${poster}" alt="${name} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${name}</p>
  <p class="card__description">${genres}, Other | ${releseDate}</p>
</figcaption>
</figure>`;

    filmsGalery.innerHTML = filmsGalery.innerHTML + galeryItem;
  });
};

// function that uses film id from createFilmsGalery function.
// This function creates details of tranding films but is used for creating genres names.
// !!! Can be used for modal window after small changes !!!
const getGenres = async id => {
  link = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`;
  let gen;
  await fetchFilms(link).then(res => {
    gen = res.genres
      .slice(0, 2)
      .map(ele => ele.name)
      .join(', ');
  });
  return gen;
};

// Pagination

paginationList.innerHTML = '';
function createButtons(totalPages, page) {
  let liTag = '';
  let beforePage = page - 1;
  let afterPage = page + 1;
  let activeLi;
  if (page > 1) {
    liTag += `<button class="pagination__button--arrow-left">
    <svg class="pagination__icon--arrow-left" style="pointer-events: none;"><use href="icons.adfc4680.svg#arrow" style="pointer-events: none;"></use></svg>
  </button>`;
  }
  if (page > 2) {
    liTag += `<button class="pagination__button" type="button" data-page="1">1</button>`;
    if (page > 3) {
      liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
    }
  }

  if (page === totalPages) {
    beforePage = beforePage - 2;
  } else if (page === totalPages - 1) {
    beforePage = beforePage - 1;
  }
  if (page === 1) {
    afterPage = afterPage + 2;
  } else if (page === totalPages + 1) {
    afterPage = afterPage + 1;
  }

  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    if (page == pageLength) {
      activeLi = 'pagination__button--current';
    } else {
      activeLi = '';
    }
    liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
    }
    liTag += `<button class="pagination__button" type="button" data-page="${totalPages}">${totalPages}</button>`;
  }

  if (page < totalPages) {
    liTag += `<button class="pagination__button--arrow-right">
    <svg class="pagination__icon--arrow-right" style="pointer-events: none;"><use href="icons.adfc4680.svg#arrow" style="pointer-events: none;"></use></svg>
  </button>`;
  }

  paginationList.innerHTML = liTag;
}

const chceckBttn = e => {
  const prev = document.querySelector('.pagination__button--arrow-left');
  const next = document.querySelector('.pagination__button--arrow-right');

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
};
paginationList.addEventListener('click', chceckBttn);

// Operating the modal window

const filmCards = [...document.querySelectorAll('figure')];
filmCards.forEach(el => el.addEventListener('click', showModal));

const closeModalBtn = document.getElementsByClassName('movie-details-modal__close-btn')[0];
window.addEventListener('click', closeModal);
closeModalBtn.addEventListener('click', closeModal);

//
