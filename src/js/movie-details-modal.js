const backdrop = document.getElementsByClassName('backdrop')[0];
const modal = document.getElementsByClassName('movie-details-modal')[0];

const showModal = () => {
    backdrop.style.display = 'block';
};

const closeModal = (e) => {
    if (backdrop.style.display !== 'none' & e.target !== modal) {
        backdrop.style.display = 'none'
    }
}

export { showModal, closeModal };