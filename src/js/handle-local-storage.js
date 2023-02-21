// This function adds a movie ID to the 'watched' array in localStorage
export const addMovieToWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || []; // Get the 'watched' array from localStorage or create a new one
  if (!watched.includes(id)) {
    // Check if the ID is already in the 'watched' array
    watched.push(id); // If not, add the ID to the 'watched' array
    localStorage.setItem('watched', JSON.stringify(watched)); // Save the updated 'watched' array in localStorage
  }
};

// This function adds a movie ID to the 'queue' array in localStorage
export const addMovieToQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || []; // Get the 'queue' array from localStorage or create a new one
  if (!queue.includes(id)) {
    // Check if the ID is already in the 'queue' array
    queue.push(id); // If not, add the ID to the 'queue' array
    localStorage.setItem('queue', JSON.stringify(queue)); // Save the updated 'queue' array in localStorage
  }
};

// This function removes a movie ID from the 'watched' array in localStorage
export const removeMovieFromWatched = id => {
  let watched = JSON.parse(localStorage.getItem('watched')) || []; // Get the 'watched' array from localStorage or create a new one
  if (watched.includes(id)) {
    // Check if the ID is in the 'watched' array
    watched = watched.filter(movieId => movieId !== id); // Remove the ID from the 'watched' array
    localStorage.setItem('watched', JSON.stringify(watched)); // Save the updated 'watched' array in localStorage
  }
};

// This function removes a movie ID from the 'queue' array in localStorage
export const removeMovieFromQueue = id => {
  let queue = JSON.parse(localStorage.getItem('queue')) || []; // Get the 'queue' array from localStorage or create a new one
  if (queue.includes(id)) {
    // Check if the ID is in the 'queue' array
    queue = queue.filter(movieId => movieId !== id); // Remove the ID from the 'queue' array
    localStorage.setItem('queue', JSON.stringify(queue)); // Save the updated 'queue' array in localStorage
  }
};
