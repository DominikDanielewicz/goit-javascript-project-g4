export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
export let PAGE = 1;
// trending / search
export let TOTAL_PAGES = 1;
export let PAGINATION_STATE = 'trending';
export let LAST_QUERY = '';
// watched / queue
export let LIBRARY_STATE = 'watched';

// to acces the variables you can simply read it after import
// to edit the variable use the set functions below

export const paginationList = document.querySelector('.pagination');

// example: setPaginationState("trending")
export const setPaginationState = flag => {
  PAGINATION_STATE = flag;
};
export const setLastQuery = query => {
  LAST_QUERY = query;
};
// example: setPage(2)`
export const setPage = page => {
  PAGE = page;
};
// example: setTotalPages(10)
export const setTotalPages = pages => {
  TOTAL_PAGES = pages;
};
export const setLibraryState = flag => {
  LIBRARY_STATE = flag;
};
