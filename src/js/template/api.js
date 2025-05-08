import axios from 'axios';

const API_KEY = '38815747-812e0b1a0705a38baabb283c8';
const BASE_URL = 'https://pixabay.com/api/';

axios.defaults.baseURL = BASE_URL;

async function getData(page = 1, query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  };

  return await axios.get('', { params });
}

export { getData };
