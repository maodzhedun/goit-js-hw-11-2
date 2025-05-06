import axios from 'axios';

const API_KEY = '38815747-812e0b1a0705a38baabb283c8';
const BASE_URL = 'https://pixabay.com/api/';
// https://pixabay.com/api/?key=38815747-812e0b1a0705a38baabb283c8&q=yellow+flowers&image_type=photo

// axios.defaults.auth = API_KEY
axios.defaults.baseURL = BASE_URL

axios.defaults.params

function getData(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios.get('', {params});
}


export {getData}