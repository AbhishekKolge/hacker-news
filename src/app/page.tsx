import NewsList from '@/components/home/news-list';

import { SORT_BY, NEWS_FILTER } from '@/utils/defaults';

import {
  GetNewsParams,
  NewsItem,
  NewsResult,
  ApiResponse,
  PageProps,
} from './types';

const getNews = async ({
  queryFilter,
  sortBy,
}: GetNewsParams): Promise<NewsResult> => {
  try {
    const queryParams = new URLSearchParams(queryFilter);
    const res = await fetch(`${process.env.BASE_URL}/${sortBy}?${queryParams}`);
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    const data: ApiResponse = await res.json();

    const results = data.hits.map((news): NewsItem => {
      return {
        title: news.title,
        id: news.story_id,
        author: news.author,
        url: news.url,
        points: news.points,
        totalComments: news.num_comments,
      };
    });

    const newsData = {
      page: data.page,
      totalPages: data.nbPages,
      results,
    };

    return newsData;
  } catch (error) {
    throw error;
  }
};

const Home = async (props: PageProps) => {
  const { searchParams } = props;
  const queryFilter = searchParams.filter
    ? JSON.parse(searchParams.filter)
    : NEWS_FILTER;
  const sortBy = searchParams.state
    ? JSON.parse(searchParams.state).sorBy
    : SORT_BY[0].value;

  const data = await getNews({ queryFilter, sortBy });

  return (
    <section className='h-full grid gap-6'>
      <NewsList {...data} />
    </section>
  );
};

export default Home;
