import Link from 'next/link';
import { UserRound, Heart, MessageSquare } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NewsImage from './news-image';

import { NewsItem } from '@/app/types';

const NewsCard: React.FC<NewsItem> = (props) => {
  const { id, title, author, url, points, totalComments } = props;
  return (
    <Card className='flex gap-6 p-6'>
      <CardHeader className='p-0'>
        <NewsImage id={id} author={author} />
      </CardHeader>
      <CardContent className='grid gap-3 p-0'>
        <Link href={`/${id}`}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <Heart size={14} />
            <span className='font-normal text-xs'>{points}</span>
          </div>
          <div className='flex items-center gap-2'>
            <UserRound size={14} />
            <span className='font-normal text-xs'>{author}</span>
          </div>
          <div className='flex items-center gap-2'>
            <MessageSquare size={14} />
            <span className='font-normal text-xs'>{totalComments}</span>
          </div>
        </div>
        {url && (
          <Link
            href={url}
            target='_blank'
            className='block text-xs text-sky-600'
          >
            {url}
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
