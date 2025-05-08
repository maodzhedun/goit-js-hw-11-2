import { getData } from './js/template/api';
import refs from './js/refs';
import { Notify } from 'notiflix';
import { Report } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { markupImages } from './js/markup/markup';

refs.formEl.addEventListener('submit', onLoadGallery);
refs.btnLoadMore.addEventListener('click', loadMoreImages);

let currentPage = 1;
let query = '';
let totalHits = 0;

let lightbox = new SimpleLightbox('.gallery a', {
  nav: true,
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  close: true,
  download: 'downloads',
});

function onLoadGallery(event) {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();

  currentPage = 1;

  if (query === '') {
    loadError();
    return;
  }
  resetPages();
  fetchAndShowImage(currentPage, query);
}

function loadMoreImages() {
  currentPage += 1;

  fetchAndShowImage(currentPage, query);
}

function fetchAndShowImage() {
  getData(currentPage, query)
    .then(respons => {
      const searchHits = respons.data.totalHits;

      Notify.info(`Hooray! We found totalHits images: ${searchHits}.`);

      if (!Array.isArray(respons.data.hits) || respons.data.hits.length === 0) {
        Report.failure(
          'Sorry, there are no images matching your search query. Please try again.',
          ''
        );
        refs.btnLoadMore.hidden = true;

        return;
      }

      refs.galleryEl.insertAdjacentHTML(
        'beforeend',
        markupImages(respons.data.hits)
      );

      lightbox.refresh();

      totalHits += respons.data.hits.length;
      console.log('View hits', totalHits);

      if (totalHits > 40) {
        const { height: cardHeight } =
          refs.formEl.firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      if (totalHits === respons.data.totalHits || totalHits < 40) {
        refs.btnLoadMore.hidden = true;
        Notify.info(
          "We're sorry, but you've reached the end of search results.",
          ''
        );
      } else {
        refs.btnLoadMore.hidden = false;
      }
    })
    .catch(err => {
      console.log('Ошибка при получении данных:', err);
    });
}

function loadSuccess() {
  Notify.success('Data load success');
}

function loadError() {
  Report.warning('Please enter a search query.', '');
}

function resetPages() {
  currentPage = 1;
  totalHits = 0;
  refs.galleryEl.innerHTML = '';
}
