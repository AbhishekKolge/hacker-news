import api from '@/api';

import { getNewsParams } from './types';
import { NewsItem, NewsResult, NewsListApiResponse } from '@/app/types';

import { PAGE_SIZE } from '@/utils/defaults';

const getNews = async ({
  queryFilters,
  sortBy,
}: getNewsParams): Promise<NewsResult> => {
  const response = await api.get(`/${sortBy}`, {
    params: { ...queryFilters, hitsPerPage: PAGE_SIZE },
  });

  const data: NewsListApiResponse = response.data;

  const results = data.hits.map((news): NewsItem => {
    return {
      title: news.title,
      id: news.story_id,
      author: news.author,
      url: news.url,
      points: news.points,
      totalComments: news.num_comments,
      createdAt: news.created_at_i,
    };
  });

  const newsData = {
    page: data.page,
    totalPages: data.nbPages,
    results,
  };

  return newsData;
};

export { getNews };
