export { showSpinner, hideSpinner, showSpinnerModal, hideSpinnerModal };

// Specify element to edit
const spinner = document.querySelector('.spinner');
const spinnerModal = document.querySelector('.spinner-modal');
const modalMovie = document.querySelector('.modal-movie');

// Show spinner
const showSpinner = () => {
  spinner.classList.remove('hidden');
};

// Hide spinner
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
