export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0';
export let PAGE = 1;

export let TOTAL_PAGES = 1;
// trending / search / watched / queue
export let PAGINATION_STATE = 'trending';
export let LAST_QUERY = '';
// watched / queue
export let LIBRARY_STATE = 'watched';

export const setPaginationState = flag => {
  PAGINATION_STATE = flag;
  console.log(`pagination state changed to ${flag}`);
};
export const setLastQuery = query => {
  LAST_QUERY = query;
};
export const setPage = page => {
  PAGE = page;
};
export const setTotalPages = pages => {
  TOTAL_PAGES = pages;
};
export const setLibraryState = flag => {
  LIBRARY_STATE = flag;
};
