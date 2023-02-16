export const paginationList = document.querySelector('.pagination');

// example: setPaginationState("trending")
export const setPaginationState = flag => {
  PAGINATION_FLAG = flag;
};
// example: setPage(2)`
export const setPage = page => {
  PAGE = page;
};
// example: setTotalPages(10)
export const setTotalPages = pages => {
  TOTAL_PAGES = pages;
};

export function createButtons(totalPages, page) {
  let liTag = '';
  let beforePage = page - 1;
  let afterPage = page + 1;
  let activeLi;

  if (page > 1) {
    liTag += `<button class="pagination__button--arrow-left">
  <i style="pointer-events: none" class="fa-solid fa-arrow-left"></i>
</button>`;
  }

  // if there's more then 6 page
  if (totalPages > 6) {
    if (page > 3) {
      liTag += `<button class="pagination__button" type="button" data-page="1">1</button>`;
      if (page > 4) {
        liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
    }

    if (page === totalPages) {
      beforePage = beforePage - 1;
    } else if (page === totalPages - 1) {
      beforePage = beforePage - 1;
    }
    if (page === 1) {
      afterPage = afterPage + 2;
    } else if (page => 2 && page <= 4) {
      afterPage = afterPage + 1;
      beforePage = beforePage - 1;
    } else if (page === totalPages + 1) {
      beforePage = beforePage + 3;
      afterPage = afterPage + 1;
    }

    for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
      if (pageLength > totalPages) {
        continue;
      }
      if (pageLength < 0) {
        pageLength = pageLength + 2;
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
    if (page < totalPages - 2) {
      if (page < totalPages - 3) {
        liTag += `<span class="pagination__hidden-results">&middot&middot&middot</span>`;
      }
      liTag += `<button class="pagination__button" type="button" data-page="${totalPages}">${totalPages}</button>`;
    }
  }
  // if there's less then 6 page
  else {
    for (let pageLength = 1; pageLength <= totalPages; pageLength++) {
      if (page == pageLength) {
        activeLi = 'pagination__button--current';
      } else {
        activeLi = '';
      }
      liTag += `<button class="${activeLi} pagination__button" type="button" data-page="${pageLength}">${pageLength}</button>`;
    }
  }

  if (page < totalPages) {
    liTag += `<button class="pagination__button--arrow-right">
  <i style="pointer-events: none" class="fa-solid fa-arrow-right"></i>
</button>`;
  }

  paginationList.innerHTML = liTag;
}
