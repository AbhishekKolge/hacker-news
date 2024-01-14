'use client';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { UserRound, Clock1, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import CommentList from './comment-list';
import { Skeleton } from '../ui/skeleton';

import { NewsDetailsChildrenApiResponse } from '@/app/types';

import { formatSecondsToDate } from '@/utils/time';
import { cn } from '@/lib/utils';

const Comment: React.FC<NewsDetailsChildrenApiResponse> = (props) => {
  const { author, created_at_i, children, text } = props;
  const [cleanText, setCleanText] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    const sanitizedText = DOMPurify.sanitize(text);
    setCleanText(sanitizedText);
  }, [text]);

  const toggleShowRepliesHandler = () => {
    setShowReplies((prevState) => !prevState);
  };

  return (
    <>
      <Card>
        <CardHeader className='grid gap-3'>
          <div className='flex items-center justify-between gap-2 flex-wrap'>
            <CardTitle className='flex items-center gap-2'>
              <UserRound size={14} />
              {author}
            </CardTitle>
            <div className='flex items-center gap-2'>
              <Clock1 size={14} />
              <span className='font-normal text-xs'>
                {formatSecondsToDate(created_at_i)}
              </span>
            </div>
          </div>
          {text &&
            (!cleanText ? (
              <Skeleton className='w-[70%] h-4' />
            ) : (
              <CardDescription
                className='break-nested'
                dangerouslySetInnerHTML={{
                  __html: cleanText,
                }}
              ></CardDescription>
            ))}
        </CardHeader>
        {!!children.length && (
          <CardFooter>
            {showReplies ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={toggleShowRepliesHandler}
                      size='sm'
                      className='p-1 bg-transparent hover:bg-transparent'
                    >
                      <ChevronUp className='text-gray-400' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='m-0'>Hide replies</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={toggleShowRepliesHandler}
                      size='sm'
                      className='p-1 bg-transparent hover:bg-transparent'
                    >
                      <ChevronDown className='text-gray-400' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className='m-0'>Show replies</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </CardFooter>
        )}
      </Card>
      {!!children.length && (
        <>
          <div className={cn('hidden gap-10', showReplies && 'flex')}>
            <Button
              onClick={toggleShowRepliesHandler}
              className='w-[1px] h-full p-0 bg-slate-200'
              aria-label='hide replies'
            />
            <CommentList comments={children} />
          </div>
        </>
      )}
    </>
  );
};

export default Comment;
