const SORT_BY = [
  {
    id: 1,
    name: 'Popularity',
    value: 'search',
  },
  {
    id: 2,
    name: 'Date',
    value: 'search_by_date',
  },
];

const SORT_FOR = [
  {
    id: 1,
    name: 'All time',
    value: 'all',
  },
  {
    id: 2,
    name: 'Last 24h',
    value: 'day',
  },
  {
    id: 3,
    name: 'Past week',
    value: 'week',
  },
  {
    id: 4,
    name: 'Past month',
    value: 'month',
  },
  {
    id: 5,
    name: 'Past year',
    value: 'year',
  },
];

const DEBOUNCE_TIME = 1000;

const THROTTLE_TIME = 5000;

const PAGE = 0;

const PAGE_SIZE = 10;

const TAG = 'story';

const DAY = 24 * 60 * 60 * 1000;

const WEEK = DAY * 7;

const CURRENT_DATE = new Date();

const MONTH = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth() - 1,
  Math.min(
    CURRENT_DATE.getDate(),
    new Date(CURRENT_DATE.getFullYear(), CURRENT_DATE.getMonth(), 0).getDate()
  ),
  0,
  0,
  0,
  0
).getTime();

const YEAR = new Date(
  CURRENT_DATE.getFullYear() - 1,
  CURRENT_DATE.getMonth(),
  Math.min(
    CURRENT_DATE.getDate(),
    new Date(
      CURRENT_DATE.getFullYear(),
      CURRENT_DATE.getMonth() + 1,
      0
    ).getDate()
  ),
  0,
  0,
  0,
  0
).getTime();

const NEWS_FILTER = {
  query: '',
  page: PAGE,
  tags: TAG,
  numericFilters: '',
};

export {
  SORT_BY,
  SORT_FOR,
  DEBOUNCE_TIME,
  THROTTLE_TIME,
  PAGE,
  PAGE_SIZE,
  TAG,
  DAY,
  WEEK,
  MONTH,
  YEAR,
  CURRENT_DATE,
  NEWS_FILTER,
};
