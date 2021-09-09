import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const key = '21989340-5677ac132e2fa2f040ad0925d';
const perPage = 12;

const fetchImages = async ({ page = 1, query } = {}) => {
  try {
    const data = await axios(
      `${baseURL}?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    );
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export { fetchImages };
