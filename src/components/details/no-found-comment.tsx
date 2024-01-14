import { AlertTriangleIcon } from 'lucide-react';

const NoCommentFound = () => {
  return (
    <div className='flex items-center gap-4 justify-center'>
      <AlertTriangleIcon size={40} className='text-red-600' />
      <h3>No comments found</h3>
    </div>
  );
};

export default NoCommentFound;
