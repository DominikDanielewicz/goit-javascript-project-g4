const modalMovieButtons = document.querySelector('.modal-movie__buttons');

modalMovieButtons.addEventListener('click', event => {
  const button = event.target;
  const movieId = button.dataset.id;

  if (button.textContent === 'ADD TO WATCHED') {
    let watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];

    if (!watchedMovies.includes(movieId)) {
      watchedMovies.push(movieId);
      localStorage.setItem('watched', JSON.stringify(watchedMovies));
      console.log(`Movie with ID ${movieId} has been added to watched.`);
    } else {
      console.log(`Movie with ID ${movieId} already exists in watched.`);
    }
  } else if (button.textContent === 'ADD TO QUEUE') {
    let queuedMovies = JSON.parse(localStorage.getItem('queue')) || [];

    if (!queuedMovies.includes(movieId)) {
      queuedMovies.push(movieId);
      localStorage.setItem('queue', JSON.stringify(queuedMovies));
      console.log(`Movie with ID ${movieId} has been added to queue.`);
    } else {
      console.log(`Movie with ID ${movieId} already exists in queue.`);
    }
  }
});
