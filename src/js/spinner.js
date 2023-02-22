export { showSpinner, hideSpinner, showSpinnerModal, hideSpinnerModal };

// specify element to edit
const spinner = document.querySelector('.spinner');
const spinnerModal = document.querySelector('.spinner-modal');
const modalMovie = document.querySelector('.modal-movie');

// showing spinner element by removing .hidden class
const showSpinner = () => {
  spinner.classList.remove('hidden');
};

// hide spinner element by removing .hidden class
const hideSpinner = () => {
  spinner.classList.add('hidden');
};

const showSpinnerModal = () => {
  spinnerModal.classList.remove('hidden');
  modalMovie.classList.add('overlay');
};

const hideSpinnerModal = () => {
  spinnerModal.classList.add('hidden');
  modalMovie.classList.remove('overlay');
};
