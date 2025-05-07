import { getData } from './js/template/api';
import refs from './js/refs';
import { markupImages } from './js/markup/markup';

getData('cat')
  .then(respons => {
    console.log('Respons', respons.data);
  })
  .catch(err => {
    console.log('Ошибка при получении данных:', err);
  });

refs.formEl.addEventListener('submit', onLoadGallery);
refs.btnLoadMore.addEventListener('click', loadMoreImages);

function onLoadGallery(event) {
  event.preventDefault();
  const query = event.target.elements.searchQuery.value.trim();
  console.log(query);
  return refs.galleryE.insertAdjacentHTML('beforeend', markupImages(images) )
}

function loadMoreImages() {
    console.log('Loading more images...')
}
