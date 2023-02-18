export const addMovieToWatched = id => {
  const watched = JSON.parse(localStorage.getItem('watched')) || [];
  if (!watched.includes(id)) {
    watched.push(id);
    localStorage.setItem('watched', JSON.stringify(watched));
  }
};
export const addMovieToQueue = id => {
  const queue = JSON.parse(localStorage.getItem('queue')) || [];
  if (!queue.includes(id)) {
    queue.push(id);
    localStorage.setItem('queue', JSON.stringify(queue));
  }
};
export const removeMovieFromWatched = id => {
  let watched = JSON.parse(localStorage.getItem('watched')) || [];
  if (watched.includes(id)) {
    watched = watched.filter(movieId => movieId !== id);
    localStorage.setItem('watched', JSON.stringify(watched));
  }
};
export const removeMovieFromQueue = id => {
  let queue = JSON.parse(localStorage.getItem('queue')) || [];
  if (queue.includes(id)) {
    queue = queue.filter(movieId => movieId !== id);
    localStorage.setItem('queue', JSON.stringify(queue));
  }
};
