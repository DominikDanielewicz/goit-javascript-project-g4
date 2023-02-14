'use strict';
const filmGalery = document.querySelector('.gallery__box');
const paginationList = document.querySelector('.pagination');

export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
let page = 1;
let totalPages;
let link;
let filmsOnPage;

const { log } = console;

// Fetch films from API

export const fetchFilms = link => {
  return fetch(link)
    .then(res => {
      return res.json();
    })
    .catch(error => log(error));
};

// This function uses the film id to get the details of that film
// Can be used to make a modal with film details
export const getFilmDetails = async id => {
  link = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}`;

  return await fetchFilms(link).then(res => {
    return res;
  });
};

// Main function that loads tranding film on main page
const trendingFilms = () => {
  link = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${APIKEY}&page=${page}`;

  return fetchFilms(link).then(res => {
    totalPages = res.total_pages;
    filmsOnPage = res.results;

    createfilmGalery(filmsOnPage);
    createButtons(totalPages, page);
  });
};

// call the function
trendingFilms();

// This function creates elements in .gallery_box
// It can be used in other parts of the website,
// but the html element definded by variable "filmGalery" -const filmGalery = document.querySelector('.gallery__box') must be there

export const createfilmGalery = elem => {
  filmGalery.innerHTML = '';
  elem.map(async film => {
    let name = film.title;
    let poster = film.poster_path;
    let filmId = film.id;
    let releseDate = film.release_date.slice(0, 4) || 'Sorry. No relase date yet.';
    let other;
    let newGenres;
    // Because i can't get the genres names from first fetch
    // i created second fetch from API that uses film id to get films details and then i extract genres names from it
    let genres = await getFilmDetails(film.id).then(res => res.genres.map(elem => elem.name));

    if (genres.length > 2) {
      newGenres = genres.slice(0, 2).join(', ');
      other = ', Other';
    } else if (genres.length <= 2 && genres.length > 1) {
      newGenres = genres;
      other = '';
      if (genres.length === 2) {
        newGenres = genres.join(', ');
        other = '';
      }
    } else {
      newGenres = 'Sorry. No genre added yet.';
      other = '';
    }

    const galeryItem = `<figure class="card" data-id="${filmId}">
<img class="card__image" src="https://image.tmdb.org/t/p/w500${poster}" alt="${name} movie poster" />
<figcaption class="card__caption">
  <p class="card__title">${name}</p>
  <p class="card__description">${newGenres + other} | ${releseDate}</p>
</figcaption>
</figure>`;

    filmGalery.innerHTML = filmGalery.innerHTML + galeryItem;
  });
};

// Pagination

function createButtons(totalPages, page) {
  let liTag = '';
  let beforePage = page - 1;
  let afterPage = page + 1;
  let activeLi;
  if (page > 1) {
    liTag += `<button class="pagination__button--arrow-left">
    <i style="pointer-events: none" class="fa-solid fa-arrow-left"></i>
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
    <i style="pointer-events: none" class="fa-solid fa-arrow-right"></i>
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
