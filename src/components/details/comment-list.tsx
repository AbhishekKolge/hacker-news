import { NewsDetailsChildrenApiResponse } from '@/app/types';

import Comment from './comment';

const CommentList: React.FC<{
  comments: NewsDetailsChildrenApiResponse[];
}> = (props) => {
  const { comments } = props;
  return (
    <div className='grid gap-4'>
      {comments.map((comment) => {
        return <Comment key={comment.id} {...comment} />;
      })}
    </div>
  );
};

export default CommentList;
