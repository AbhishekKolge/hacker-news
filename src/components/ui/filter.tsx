'use client';
import { ChangeEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { SORT_BY, SORT_FOR, CURRENT_DATE } from '@/utils/defaults';
import { cn } from '@/lib/utils';

interface FilterProps {
  firstRender: boolean;
  search: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  sortByValue: string;
  onSortBy: (sorBy: string) => void;
  sortForValue: string | null;
  onSortFor: (value: string) => void;
  dateRange: DateRange;
  onDateRange: SelectRangeEventHandler;
  onClear: () => void;
}

const Filter: React.FC<FilterProps> = (props) => {
  const {
    firstRender,
    search,
    onSearch,
    sortByValue,
    onSortBy,
    sortForValue,
    onSortFor,
    dateRange,
    onDateRange,
    onClear,
  } = props;

  const selectedSortFor = SORT_FOR.find(
    (option) => option.value === sortForValue
  )?.name;

  return (
    <div className='grid lg:grid-cols-3 gap-3'>
      <div className='relative lg:col-span-2'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search'
          className='pl-8'
          onChange={onSearch}
          value={search}
        />
      </div>
      <div className='grid sm:grid-cols-3 gap-3'>
        <Select
          defaultValue={SORT_BY[0].value}
          onValueChange={onSortBy}
          value={sortByValue}
        >
          <SelectTrigger>
            {firstRender ? (
              <Loader2 className='h-4 w-4 animate-spin m-auto' />
            ) : (
              <SelectValue />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SORT_BY.map((option) => {
                return (
                  <SelectItem key={option.id} value={option.value}>
                    {option.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className='justify-start text-left font-normal'
            >
              {firstRender ? (
                <Loader2 className='h-4 w-4 animate-spin m-auto' />
              ) : selectedSortFor ? (
                <span>{selectedSortFor}</span>
              ) : (
                <span>Custom</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align='start'
            className='flex w-auto flex-col space-y-2 p-2'
          >
            <Select
              defaultValue={SORT_FOR[0].value}
              value={sortForValue || ''}
              onValueChange={onSortFor}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent position='popper'>
                {SORT_FOR.map((option) => {
                  return (
                    <SelectItem key={option.id} value={option.value}>
                      {option.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <div className='rounded-md border'>
              <Calendar
                mode='range'
                selected={dateRange}
                onSelect={onDateRange}
                disabled={{ after: CURRENT_DATE }}
              />
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={onClear}>Clear</Button>
      </div>
    </div>
  );
};

export default Filter;
