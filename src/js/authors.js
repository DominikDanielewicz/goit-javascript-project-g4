//backdrop and modal window
const backdrop = document.querySelector('.authors__backdrop');
//button to open modal window
const authorButton = document.querySelector('.students-link');
const modalButton = document.querySelector('.modal__button');

const openModal = e => {
  e.preventDefault();
  backdrop.classList.replace('hidden', 'show');
};

const closeModal = () => {
  backdrop.classList.replace('show', 'hidden');
};

authorButton.addEventListener('click', openModal);

modalButton.addEventListener('click', closeModal);
