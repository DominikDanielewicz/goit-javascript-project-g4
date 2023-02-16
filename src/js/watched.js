const watchedBtn = document.querySelector('.modal-movie__button-add-to-watched');
const queueBtn = document.querySelector('.modal-movie__button-add-to-queue');

let watched = JSON.parse(localStorage.getItem('watched')) || [];
let queue = JSON.parse(localStorage.getItem('queue')) || [];

function addToWatched(event) {
  const button = event.target;
  const movieId = button.dataset.id;

  if (!watched.includes(movieId)) {
    watched.push(movieId);
  }

  localStorage.setItem('watched', JSON.stringify(watched));
}

function addToQueue(event) {
  const button = event.target;
  const movieId = button.dataset.id;
  ``````````````````````;
  if (!queue.includes(movieId)) {
    queue.push(movieId);
  }

  localStorage.setItem('queue', JSON.stringify(queue));
}

watchedBtn.addEventListener('click', addToWatched);
queueBtn.addEventListener('click', addToQueue);
