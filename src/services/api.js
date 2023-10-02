import axios from 'axios';

const API_KEY = '38889526-086820321c5fcbdbccd359080';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchRequest(name, page = 1) {
  const param = new URLSearchParams({
    q: name,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 12,
  });
  const { data } = await axios(`${BASE_URL}?${param}`);

  return data;
}
