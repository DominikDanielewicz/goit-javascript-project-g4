import { fetchTrending } from './fetch';
import { PAGINATION_STATE, setPaginationState } from './globals';

const basePosterUrl = 'https://image.tmdb.org/t/p/w500';
const noPosterImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png';
export async function createGallery(data, key) {
  const galleryBox = document.querySelector('.gallery__box');
  let cards = '';

  data.forEach(movie => {

    // Initialize movie genres to Unknown
    let movieGenres = 'Unknown';

    // If genre ID exists and length is more than 0, assign movieGenres to either the first two IDs or IDs plus 'other'
    if (movie.genre_ids && movie.genre_ids.length) {
      if (movie.genre_ids.length > 2) {
        movieGenres = movie.genre_ids.slice(0, 2).join(', ') + ', Other';
      } else {
        movieGenres = movie.genre_ids.join(', ');
      }
    }

    // Get the release year from the release date
    const year = movie.release_date.slice(0, 4);

    // Assign title with some basic validation
    let title = movie.title;
    if (title.length > 35) {
      const lastSpaceIndex = title.lastIndexOf(' ', 32);
      title = title.slice(0, lastSpaceIndex) + '...';
    }

    // Assign the movie poster with validation
    let moviePoster = '';
    if (movie.poster_path) {
      moviePoster = `<img class="card__image" src="${basePosterUrl + movie.poster_path}" alt="${
        movie.title
      }" loading="lazy"/>`;
    } else {
      moviePoster = `<img class="card__image" src="${noPosterImage}" alt="${movie.title}" loading="lazy"/>`;
    }

    // Assign the description with validation
    let description =
      PAGINATION_STATE === 'watched' || PAGINATION_STATE === 'queue'
        ? `<p class="card__description">
        ${movieGenres} | ${year}
        <span class="card__highlight">
          ${movie.vote_average.toFixed(1)}
        </span>
      </p>`
        : `<p class="card__description">
        ${movieGenres} | ${year}
      </p>`;

    // Append card HTML to string
    cards += `<figure class="card" data-id="${movie.id}" data-key="${key}">
    ${moviePoster}
    <figcaption class="card__caption">
      <p class="card__title">${title}</p>
      ${description}
    </figcaption>
  </figure>`;
  });

  galleryBox.innerHTML = cards;
  const images = document.querySelectorAll('.card__image');

  images.forEach(image => {

    // Create a container wrapper for every image
    const container = document.createElement('div');
    container.className = 'image-container';
    image.parentNode.insertBefore(container, image);
    container.appendChild(image);

    // Create the spinner and add it to a container
    const spinner = document.createElement('div');
    spinner.className = 'spinner__image';
    container.appendChild(spinner);

    // Show spinner and remove loadstart event listener
    function showSpinner() {
      spinner.style.display = 'block';
      image.removeEventListener('loadstart', showSpinner);
    }

    // Show spinner on loadstart
    image.addEventListener('loadstart', showSpinner);

    // Hide spinner and remove load event listener
    function hideSpinner() {
      spinner.style.display = 'none';
      spinner.parentNode.removeChild(spinner);
      image.removeEventListener('load', hideSpinner);
    }

    // Hide spinner on complete load
    image.addEventListener('load', hideSpinner);
  });
}

// Check if pagination state is set to 'trending' and current page is not the library page
if (PAGINATION_STATE === 'trending' && window.location.pathname.indexOf('library.html') === -1) {
  // Fetch trending movies and create the relevant gallery
  fetchTrending(1).then(data => {
    createGallery(data);
  });

  // Set pagination state to 'trending'
  setPaginationState('trending');
}
