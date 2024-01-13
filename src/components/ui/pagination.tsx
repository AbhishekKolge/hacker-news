import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Button } from './button';

interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  totalPages: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { onNext, onPrev, totalPages, currentPage } = props;

  return (
    <div className='flex items-center justify-end gap-6'>
      <div className='flex items-center justify-center text-sm font-medium'>
        {!!currentPage &&
          !!totalPages &&
          `Page ${currentPage} of ${totalPages}`}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={onPrev}
          disabled={currentPage === 1}
        >
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='h-8 w-8 p-0'
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
