import { NewsItem, NewsResult, NewsListApiResponse, PageProps } from './types';

import News from '@/components/home/news';

import { NEWS_FILTER } from '@/utils/defaults';

const getNews = async (): Promise<NewsResult> => {
  try {
    const queryParams = new URLSearchParams({
      ...NEWS_FILTER,
      page: String(NEWS_FILTER.page),
    });
    const res = await fetch(`${process.env.BASE_URL}/search?${queryParams}`);
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    const data: NewsListApiResponse = await res.json();

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
  } catch (error) {
    throw error;
  }
};

const Home: React.FC<PageProps> = async () => {
  const data = await getNews();

  return (
    <section className='h-full grid gap-6'>
      <News {...data} />
    </section>
  );
};

export default Home;
