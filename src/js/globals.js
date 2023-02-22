export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0'; // API key used to make requests to the movie database

export let PAGE = 1; // Current page number

export let TOTAL_PAGES = 1; // Total number of results pages

// Current pagination state, which can be one of the following: 'trending', 'search', 'watched', or 'queue'
export let PAGINATION_STATE = 'trending';

export let LAST_QUERY = ''; // Last search query that was made

// Current library state, which can be either 'watched' or 'queue'
export let LIBRARY_STATE = 'watched';

export const setPaginationState = flag => {
  PAGINATION_STATE = flag; // Set current pagination state to the provided flag
};

export const setLastQuery = query => {
  LAST_QUERY = query; // Set last search query to the provided query
};

export const setPage = page => {
  PAGE = page; // Set current page number to the provided page
};

export const setTotalPages = pages => {
  TOTAL_PAGES = pages; // Set total number of pages to the provided pages
};

export const setLibraryState = flag => {
  LIBRARY_STATE = flag; // Set current library state to the provided flag
};
