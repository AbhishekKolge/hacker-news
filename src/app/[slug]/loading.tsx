import { UserRound, Heart, Clock1 } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

import { LOADING_COMMENT_CARD_LENGTH } from '@/utils/defaults';

const Loading: React.FC = () => {
  return (
    <section className='h-full grid gap-10'>
      <div className='flex flex-col items-start sm:flex-row sm:items-center gap-6'>
        <Skeleton className='w-20 h-20 rounded-sm' />
        <div className='grid gap-2'>
          <Skeleton className='w-[100%] h-[30px] rounded-sm' />
          <div className='flex gap-3 items-center flex-wrap'>
            <div className='flex items-center gap-2'>
              <Heart size={14} />
              <Skeleton className='w-14 h-4 rounded-sm' />
            </div>
            <div className='flex items-center gap-2'>
              <UserRound size={14} />
              <Skeleton className='w-14 h-4 rounded-sm' />
            </div>
            <div className='flex items-center gap-2'>
              <Clock1 size={14} />
              <Skeleton className='w-[90px] h-4 rounded-sm' />
            </div>
          </div>
          <Skeleton className='w-[100px] h-4 rounded-sm' />
        </div>
      </div>
      <div className='grid gap-4 w-full'>
        {Array.from({ length: LOADING_COMMENT_CARD_LENGTH }).map((_, index) => {
          return (
            <Skeleton key={index} className='h-[100px] w-full rounded-xl' />
          );
        })}
      </div>
    </section>
  );
};

export default Loading;
