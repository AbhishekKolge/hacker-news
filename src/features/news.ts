import api from '@/api';

const getNews = async () => {
  const response = await api.get('/search');
  return response.data;
};

export { getNews };
