import zuzaimage from '../images/zuza.jpg';
import martaimage from '../images/marta.jpg';
import dominikimage from '../images/dominik.jpg';
import pawelimage from '../images/pawel.jpg';
import dawidimage from '../images/dawid.jpg';
import rafalimage from '../images/rafal.jpg';
import patrykimage from '../images/patryk.jpg';

const authors = [
  {
    name: 'Zuza Kaźmierczak',
    photo: zuzaimage,
    role: 'Developer',
    description: 'Lorem ipsum Zuza',
  },
  {
    name: 'Marta Dąbrowska',
    photo: martaimage,
    role: 'Developer',
    description: 'Lorem ipsum Marta',
  },
  {
    name: 'Dominik Danielewicz',
    photo: dominikimage,
    role: 'Team Lead, Developer',
    description: 'Lorem ipsum Dominik',
  },
  {
    name: 'Paweł Rogowski',
    photo: pawelimage,
    role: 'Manual Tester, Developer',
    description: 'Lorem ipsum Paweł',
  },
  {
    name: 'Dawid Bartuś',
    photo: dawidimage,
    role: 'Scrum Master, Developer',
    description: 'Lorem ipsum Dawid',
  },
  {
    name: 'Rafał Szewczyk',
    photo: rafalimage,
    role: 'Developer',
    description: 'Lorem ipsum Rafał',
  },
  {
    name: 'Patryk Karolczak',
    photo: patrykimage,
    role: 'Developer',
    description: 'Lorem ipsum Patryk',
  },
];

//backdrop and modal window
const backdrop = document.querySelector('.authors__backdrop');
//button to open modal window
const authorButton = document.querySelector('.students-link');
const modalButton = document.querySelector('.authors__button-close');

const authorsButtons = document.querySelector('.authors__list');

const authorsPhoto = document.querySelector('.authors__photo');
const authorsName = document.querySelector('.authors__name');
const authorsRole = document.querySelector('.authors__role');
const authorsDescription = document.querySelector('.authors__description');
const authorsTabs = Array.from(authorsButtons.children);

authorsButtons.addEventListener('click', selectAuthor);

function selectAuthor(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  authorsTabs.forEach(tab => {
    tab.classList.remove('authors__tab--active');
    tab.classList.add('authors__tab');
  });

  e.target.classList.add('authors__tab--active');

  for (const { name, photo, role, description } of authors) {
    if (name.includes(e.target.innerText)) {
      authorsName.textContent = name;
      authorsRole.textContent = role;
      authorsDescription.textContent = description;
      authorsPhoto.src = photo;
    }
  }
}

const openModal = e => {
  e.preventDefault();
  backdrop.classList.replace('hidden', 'show');
};

const closeModal = () => {
  backdrop.classList.replace('show', 'hidden');
};

authorButton.addEventListener('click', openModal);
modalButton.addEventListener('click', closeModal);
