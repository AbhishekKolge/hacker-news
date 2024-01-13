'use client';
import Filter from '@/components/ui/filter';

import useFilters from '@/hooks/useFilter';

const Home = () => {
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

  console.log(queryFilterState, helperState);

  return (
    <section className='h-full grid'>
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
    </section>
  );
};

export default Home;
