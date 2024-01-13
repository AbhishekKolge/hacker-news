import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { getInitials } from '@/utils/helper';

const NewsImage: React.FC<{ id: number; author: string }> = (props) => {
  const { id, author } = props;
  return (
    <Avatar className='w-20 h-20 rounded-sm border'>
      <AvatarImage
        className='object-cover'
        src={`https://d3cy0a008d28vf.cloudfront.net/${id}.png`}
        alt={`@${id}`}
      />
      <AvatarFallback className='text-4xl uppercase'>
        {getInitials(author || '')}
      </AvatarFallback>
    </Avatar>
  );
};

export default NewsImage;
