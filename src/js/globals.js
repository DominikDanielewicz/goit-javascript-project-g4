export const APIKEY = 'cd99a2449e6daaffb205ea92bac682a0'; // The API key used to make requests to the movie database

export let PAGE = 1; // The current page number

export let TOTAL_PAGES = 1; // The total number of pages of results

// The current pagination state, which can be one of 'trending', 'search', 'watched', or 'queue'
export let PAGINATION_STATE = 'trending';

export let LAST_QUERY = ''; // The last search query that was made

// The current library state, which can be one of 'watched' or 'queue'
export let LIBRARY_STATE = 'watched';

export const setPaginationState = flag => {
  PAGINATION_STATE = flag; // Sets the current pagination state to the provided flag
};

export const setLastQuery = query => {
  LAST_QUERY = query; // Sets the last search query to the provided query
};

export const setPage = page => {
  PAGE = page; // Sets the current page number to the provided page
};

export const setTotalPages = pages => {
  TOTAL_PAGES = pages; // Sets the total number of pages to the provided pages
};

export const setLibraryState = flag => {
  LIBRARY_STATE = flag; // Sets the current library state to the provided flag
};
