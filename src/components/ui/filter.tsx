'use client';
import { useState, ChangeEvent } from 'react';
import { Search } from 'lucide-react';
import { addDays } from 'date-fns';
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
  search: string;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  sortByValue: string;
  onSortBy: (sorBy: string) => void;
  sortForValue: string | null;
  onSortFor: (value: string) => void;
  dateRange: DateRange;
  onDateRange: SelectRangeEventHandler;
}

const Filter: React.FC<FilterProps> = (props) => {
  const {
    search,
    onSearch,
    sortByValue,
    onSortBy,
    sortForValue,
    onSortFor,
    dateRange,
    onDateRange,
  } = props;
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const selectedSortFor = SORT_FOR.find(
    (option) => option.value === sortForValue
  )?.name;

  return (
    <div className='grid grid-cols-2 gap-3'>
      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search'
          className='pl-8'
          onChange={onSearch}
          value={search}
        />
      </div>
      <div className='grid grid-cols-3 gap-3'>
        <Select
          defaultValue={SORT_BY[0].value}
          onValueChange={onSortBy}
          value={sortByValue}
        >
          <SelectTrigger>
            <SelectValue />
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
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              {selectedSortFor ? (
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
      </div>
    </div>
  );
};

export default Filter;
