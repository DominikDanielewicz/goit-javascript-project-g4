export { showSpinner, hideSpinner };

//const gallery = document.querySelector('.gallery__box');
const spinner = document.querySelector('.spinner');

//showing spinner
const showSpinner = () => {
  spinner.classList.replace('hidden', 'show');
};

//hide spinner
const hideSpinner = () => {
  spinner.classList.replace('show', 'hidden');
};
