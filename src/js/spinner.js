export { showSpinner, hideSpinner };

//const gallery = document.querySelector('.gallery__box');
const spinner = document.querySelector('.spinner');

//showing spinner
const showSpinner = () => {
  spinner.classList.remove('hidden');
};

//hide spinner
const hideSpinner = () => {
  spinner.classList.add('hidden');
};
