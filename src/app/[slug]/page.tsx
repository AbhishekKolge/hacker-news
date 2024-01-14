import Link from 'next/link';
import { UserRound, Heart, Clock1 } from 'lucide-react';

import { NewsDetailsApiResponse, NewsDetails, PageProps } from '../types';

import NewsImage from '@/components/home/news-image';
import CommentList from '@/components/details/comment-list';
import NoCommentFound from '@/components/details/no-found-comment';

import { formatSecondsToDate } from '@/utils/time';

const getNewsDetails = async (id: string): Promise<NewsDetails> => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/items/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }

    const data: NewsDetailsApiResponse = await res.json();

    const result = {
      title: data.title,
      id: data.story_id,
      author: data.author,
      url: data.url,
      points: data.points,
      createdAt: data.created_at_i,
      comments: data.children,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

const Details: React.FC<PageProps> = async (props) => {
  const {
    params: { slug },
  } = props;
  const data = await getNewsDetails(slug);

  return (
    <section className='h-full grid gap-10'>
      <div className='flex flex-col items-start sm:flex-row sm:items-center gap-6'>
        <NewsImage id={data.id} author={data.author} />
        <div className='grid gap-2'>
          <h2 className='border-none p-0'>{data.title}</h2>
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='flex items-center gap-2'>
              <Heart size={14} />
              <span className='font-normal text-xs'>{data.points}</span>
            </div>
            <div className='flex items-center gap-2'>
              <UserRound size={14} />
              <span className='font-normal text-xs'>{data.author}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock1 size={14} />
              <span className='font-normal text-xs'>
                {formatSecondsToDate(data.createdAt)}
              </span>
            </div>
          </div>
          {data.url && (
            <Link
              href={data.url}
              target='_blank'
              className='block text-xs text-sky-600'
            >
              {new URL(data.url).origin}
            </Link>
          )}
        </div>
      </div>
      {!!data.comments.length ? (
        <CommentList comments={data.comments} />
      ) : (
        <NoCommentFound />
      )}
    </section>
  );
};

export default Details;
