const watchedBtn = document.querySelector('.modal-movie__button-add-to-watched');

let watched = [];

function addToWatched(event) {
  const button = event.target;
  const movieId = button.dataset.id;
  watched.push(movieId);

  localStorage.setItem('watched', watched);
  console.log(`Movie with ID ${movieId} has been added to watched.`);
  console.log(localStorage.getItem('watched'));
}

watchedBtn.addEventListener('click', addToWatched);

const watchedList = localStorage.getItem('watched');
watchedList.forEach(item => {
  console.log(item);
});
