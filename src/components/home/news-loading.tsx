import { Skeleton } from '@/components/ui/skeleton';

import { LOADING_CARD_LENGTH } from '@/utils/defaults';

const NewsLoading: React.FC = () => {
  return Array.from({ length: LOADING_CARD_LENGTH }).map((_, index) => {
    return <Skeleton key={index} className='h-[130px] w-full rounded-xl' />;
  });
};

export default NewsLoading;
