// select the element with the modal-container class
const modal = document.querySelector('.modal-container');

// add event listener to the trigger element
const triggerElement = document.querySelector('.trigger-element');
triggerElement.addEventListener('click', () => {
  modalContainer.classList.toggle('hidden');
});
