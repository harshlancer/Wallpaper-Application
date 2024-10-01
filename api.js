import axios from 'axios';

const API_KEY = '838RVg5evUzkGjw1MIoLmrLLKzpzx5dXpNK8SEYw9GXXR1rS7mNCi6tl';
const BASE_URL = 'https://api.pexels.com/v1/';

export const fetchWallpapers = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}search`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query,
        per_page: 50,
        page,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

