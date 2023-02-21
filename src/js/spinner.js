export { showSpinner, hideSpinner };

// specify element to edit
const spinner = document.querySelector('.spinner');

// showing spinner element by removing .hidden class
const showSpinner = () => {
  spinner.classList.remove('hidden');
};

// hide spinner element by removing .hidden class
const hideSpinner = () => {
  spinner.classList.add('hidden');
};
