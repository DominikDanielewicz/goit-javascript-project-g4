function changeButtonText() {
  const addToWatchedButton = document.querySelector('.modal-movie__button-add-to-watched');
  const addToQueueButton = document.querySelector('.modal-movie__button-add-to-queue');

  addToWatchedButton.textContent = 'REMOVE FROM WATCHED';
  addToQueueButton.textContent = 'REMOVE FROM QUEUE';
}
changeButtonText();

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
      button.textContent = 'REMOVE FROM WATCHED';
    } else {
      console.log(`Movie with ID ${movieId} already exists in watched.`);
    }
  } else if (button.textContent === 'ADD TO QUEUE') {
    let queuedMovies = JSON.parse(localStorage.getItem('queue')) || [];

    if (!queuedMovies.includes(movieId)) {
      queuedMovies.push(movieId);
      localStorage.setItem('queue', JSON.stringify(queuedMovies));
      console.log(`Movie with ID ${movieId} has been added to queue.`);
      button.textContent = 'REMOVE FROM QUEUE';
    } else {
      console.log(`Movie with ID ${movieId} already exists in queue.`);
    }
  } else if (button.textContent === 'REMOVE FROM WATCHED') {
    let watchedMovies = JSON.parse(localStorage.getItem('watched')) || [];

    if (watchedMovies.includes(movieId)) {
      watchedMovies = watchedMovies.filter(id => id !== movieId);
      localStorage.setItem('watched', JSON.stringify(watchedMovies));
      console.log(`Movie with ID ${movieId} has been removed from watched.`);
    } else {
      console.log(`Movie with ID ${movieId} is not in watched.`);
    }
  } else if (button.textContent === 'REMOVE FROM QUEUE') {
    let queuedMovies = JSON.parse(localStorage.getItem('queue')) || [];

    if (queuedMovies.includes(movieId)) {
      queuedMovies = queuedMovies.filter(id => id !== movieId);
      localStorage.setItem('queue', JSON.stringify(queuedMovies));
      console.log(`Movie with ID ${movieId} has been removed from queue.`);
    } else {
      console.log(`Movie with ID ${movieId} is not in queue.`);
    }
  }
});
