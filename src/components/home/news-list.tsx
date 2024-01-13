'use client';
import Filter from '@/components/ui/filter';

import useFilters from '@/hooks/useFilter';

import { NewsResult } from '@/app/types';

const NewsList: React.FC<NewsResult> = (props) => {
  const { page, totalPages, results } = props;
  const {
    queryFilterState,
    helperState,
    methods: {
      nextPageHandler,
      prevPageHandler,
      searchHandler,
      sortByHandler,
      sortForHandler,
      customDateRangeHandler,
    },
  } = useFilters();

  const dateRange = {
    from: helperState.dateFrom ? new Date(helperState.dateFrom) : undefined,
    to: helperState.dateTo ? new Date(helperState.dateTo) : undefined,
  };

  return (
    <>
      <Filter
        search={helperState.query}
        onSearch={searchHandler}
        sortByValue={helperState.sorBy}
        onSortBy={sortByHandler}
        sortForValue={helperState.sortFor}
        onSortFor={sortForHandler}
        dateRange={dateRange}
        onDateRange={customDateRangeHandler}
      />
    </>
  );
};

export default NewsList;
