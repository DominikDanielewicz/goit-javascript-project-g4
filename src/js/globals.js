export let PAGE = 1;
// trending / search / watched / queue
export let TOTAL_PAGES = 1;
export let PAGINATION_STATE = 'trending';

// to acces the variables you can simply read it after import
// to edit the variable use the set functions below

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
