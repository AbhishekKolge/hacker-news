import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { NewsItem } from '@/app/types';

const NewsCard: React.FC<NewsItem> = (props) => {
  const { id, title, author, url, points, totalComments } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default NewsCard;
