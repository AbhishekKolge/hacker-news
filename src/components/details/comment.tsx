'use client';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { NewsDetailsChildrenApiResponse } from '@/app/types';

const Comment: React.FC<NewsDetailsChildrenApiResponse> = (props) => {
  const { id, author, created_at_i, children, text } = props;
  const [cleanText, setCleanText] = useState('');

  useEffect(() => {
    const sanitizedText = DOMPurify.sanitize(text);
    setCleanText(sanitizedText);
  }, [text]);

  return (
    <>
      <Card className=''>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription
            dangerouslySetInnerHTML={{
              __html: cleanText,
            }}
          ></CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default Comment;
