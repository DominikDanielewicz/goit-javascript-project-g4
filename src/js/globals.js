export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
export let PAGE = 1;

export let TOTAL_PAGES = 1;
// trending / search / watched / queue
export let PAGINATION_STATE = 'trending';
export let LAST_QUERY = '';
// watched / queue
export let LIBRARY_STATE = 'watched';
export let TOTAL_PAGES_LIBRARY = 1;
export let PAGE_LIBRARY = 1;

// to acces the variables you can simply read it after import
// to edit the variable use the set functions below

// example: setPaginationState("trending")
export const setPaginationState = flag => {
  PAGINATION_STATE = flag;
  console.log(`pagination state changed to ${flag}`);
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
export const setTotalPagesLibrary = pages => {
  TOTAL_PAGES_LIBRARY = pages;
};
export const setPageLibrary = page => {
  PAGE_LIBRARY = page;
};
