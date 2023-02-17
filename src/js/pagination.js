import { createGallery } from './create-gallery';
import { fetchQuery, fetchTrending } from './fetch';
import { PAGE, TOTAL_PAGES, PAGINATION_STATE, LAST_QUERY, PAGE_LIBRARY, setPage } from './globals';
import { createLibrary } from './create-library';
const paginationList = document.querySelector('.pagination');

paginationList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const pageNumber = Number(event.target.dataset.page);
    if (PAGINATION_STATE === 'trending') {
      fetchTrending(pageNumber).then(data => {
        createGallery(data);
      });
    } else if (PAGINATION_STATE === 'search') {
      fetchQuery(LAST_QUERY, pageNumber).then(data => {
        createGallery(data);
      });
    } else if (PAGINATION_STATE === 'watched') {
      setPage(pageNumber);
      createLibrary(PAGINATION_STATE, pageNumber);
    } else if (PAGINATION_STATE === 'queue') {
      setPage(pageNumber);
      createLibrary(PAGINATION_STATE, pageNumber);
    }
  }
});

export function createButtons(TOTAL_PAGES, PAGE) {
  let liTag = '';
  let beforePage = PAGE - 1;
  let afterPage = PAGE + 1;
  let activeLi;

  if (PAGE > 1) {
    liTag += `<button class="pagination__button--arrow-left" data-page="${PAGE - 1}">
  <i style="pointer-events: none" class="fa-solid fa-arrow-left"></i>
</button>`;
  }

  // if there's more then 6 page
  if (TOTAL_PAGES > 6) {
    if (PAGE > 3) {
      liTag += `<button class="pagination__button" type="button" data-page="1">1</button>`;
      if (PAGE > 4) {
        liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
    }

    if (PAGE === TOTAL_PAGES) {
      beforePage = beforePage - 1;
    } else if (PAGE === TOTAL_PAGES - 1) {
      beforePage = beforePage - 1;
    }
    if (PAGE === 1) {
      afterPage = afterPage + 2;
    } else if (page => 2 && page <= 4) {
      afterPage = afterPage + 1;
      beforePage = beforePage - 1;
    } else if (PAGE === TOTAL_PAGES + 1) {
      beforePage = beforePage + 3;
      afterPage = afterPage + 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > TOTAL_PAGES) {
        continue;
      }
      if (pageLength < 0) {
        pageLength = pageLength + 2;
      }
      if (pageLength === 0) {
        pageLength = pageLength + 1;
      }

      if (PAGE == pageLength) {
        activeLi = 'pagination__button--current';
      } else {
        activeLi = '';
      }
      liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
    }
    if (PAGE < TOTAL_PAGES - 2) {
      if (PAGE < TOTAL_PAGES - 3) {
        liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
      liTag += `<button class="pagination__button" type="button" data-page="${TOTAL_PAGES}">${TOTAL_PAGES}</button>`;
    }
  }
  // if there's less then 6 page
  else {
    for (let pageLength = 1; pageLength <= TOTAL_PAGES; pageLength++) {
      if (PAGE == pageLength) {
        activeLi = 'pagination__button--current';
      } else {
        activeLi = '';
      }
      liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
    }
  }

  if (PAGE < TOTAL_PAGES) {
    liTag += `<button class="pagination__button--arrow-right" data-page="${PAGE + 1}">
  <i style="pointer-events: none" class="fa-solid fa-arrow-right"></i>
</button>`;
  }

  paginationList.innerHTML = liTag;
}
