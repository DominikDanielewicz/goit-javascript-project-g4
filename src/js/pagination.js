import { createGallery } from './create-gallery';
import { fetchQuery, fetchTrending } from './fetch';
import { PAGINATION_STATE, LAST_QUERY, setPage } from './globals';
import { createLibrary } from './create-library';
import { hideSpinner, showSpinner } from './spinner';

// Get references to DOM elements
const paginationList = document.querySelector('.pagination');

// Scroll to the top
function scrollToTop() {
  window.scrollTo({
    top: 230,
    left: 0,
    behavior: 'smooth',
  });
}

// Add event listener for pagination buttons
paginationList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    const pageNumber = Number(event.target.dataset.page);

    // Handle pagination states
    if (PAGINATION_STATE === 'trending') {
      showSpinner();
      fetchTrending(pageNumber).then(data => {
        createGallery(data);
        hideSpinner();
      });
    } else if (PAGINATION_STATE === 'search') {
      showSpinner();
      fetchQuery(LAST_QUERY, pageNumber).then(data => {
        createGallery(data);
        hideSpinner();
      });
    } else if (PAGINATION_STATE === 'watched') {
      setPage(pageNumber);
      createLibrary(PAGINATION_STATE, pageNumber);
    } else if (PAGINATION_STATE === 'queue') {
      setPage(pageNumber);
      createLibrary(PAGINATION_STATE, pageNumber);
    }

    // Scroll to the top
    scrollToTop();
  }
});

export function createButtons(TOTAL_PAGES, PAGE) {
  let paginationButton = '';
  let beforePage = PAGE - 1;
  let afterPage = PAGE + 1;
  let activeButton;

  // If current page > 1, add a button leading to the previous page
  if (PAGE > 1) {
    paginationButton += `<button class="pagination__button--arrow-left" data-page="${PAGE - 1}">
  <i style="pointer-events: none" class="fa-solid fa-arrow-left"></i>
</button>`;
  }

  // If there are more than 6 pages, generate pagination buttons
  if (TOTAL_PAGES > 6) {
    // If current page > 3, add a button leading to page 1
    if (PAGE > 3) {
      paginationButton += `<button class="pagination__button" type="button" data-page="1">1</button>`;

      // If current page > 4, add a span element with ellipses to indicate hidden results
      if (PAGE > 4) {
        paginationButton += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
    }

    // Determine which page numbers to show before and after the current page based on the current page number
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

    // Generate pagination buttons for each page between beforePage and afterPage
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

      // Add a class to the button to indicate if it's the currently active page
      if (PAGE == pageLength) {
        activeButton = 'pagination__button--current';
      } else {
        activeButton = '';
      }
      paginationButton += `<button class="${activeButton} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
    }

    // If current page < total pages - 2, add a button to go to the last page
    if (PAGE < TOTAL_PAGES - 2) {
      if (PAGE < TOTAL_PAGES - 3) {
        paginationButton += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
      paginationButton += `<button class="pagination__button" type="button" data-page="${TOTAL_PAGES}">${TOTAL_PAGES}</button>`;
    }
  }

  // If there are fewer than 6 pages, generate pagination buttons for all pages
  else {
    for (let pageLength = 1; pageLength <= TOTAL_PAGES; pageLength++) {
      if (PAGE == pageLength) {
        activeButton = 'pagination__button--current';
      } else {
        activeButton = '';
      }
      paginationButton += `<button class="${activeButton} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
    }
  }

  // Add a button with a right arrow icon if the current page is not the last one
  if (PAGE < TOTAL_PAGES) {
    paginationButton += `<button class="pagination__button--arrow-right" data-page="${PAGE + 1}">
  <i style="pointer-events: none" class="fa-solid fa-arrow-right"></i>
</button>`;
  }

  // Fill button container with buttons
  paginationList.innerHTML = paginationButton;
}
